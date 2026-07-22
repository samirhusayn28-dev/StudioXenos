import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

class Media {
  constructor({ geometry, gl, image, index, length, renderer, scene, screen, viewport, bend, borderRadius = 0 }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.bend = bend;
    this.borderRadius = borderRadius;
    // Natural image dimensions — filled once image loads
    this.imageNaturalWidth = 1;
    this.imageNaturalHeight = 1;
    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.imageNaturalWidth = img.naturalWidth;
      this.imageNaturalHeight = img.naturalHeight;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      // Re-calculate plane scale now that we know the real ratio
      this.onResize();
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  getScreenRect(camera, screen) {
    const fov = (camera.fov * Math.PI) / 180;
    const worldH = 2 * Math.tan(fov / 2) * camera.position.z;
    const worldW = worldH * camera.aspect;
    const cx = ((this.plane.position.x / (worldW / 2)) * 0.5 + 0.5) * screen.width;
    const cy = ((-this.plane.position.y / (worldH / 2)) * 0.5 + 0.5) * screen.height;
    const pw = (this.plane.scale.x / worldW) * screen.width;
    const ph = (this.plane.scale.y / worldH) * screen.height;
    return { cx, cy, pw, ph };
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;
    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }

    this.scale = this.screen.height / 1500;

    // Base height stays the same for all cards
    const baseH = this.viewport.height * (900 * this.scale) / this.screen.height;

    // Derive width from actual image aspect ratio so frame matches image shape
    const imgRatio = this.imageNaturalWidth / this.imageNaturalHeight || 1;

    // Clamp ratio so portrait images don't become too narrow
    // and landscape images don't become too wide
    const clampedRatio = Math.min(Math.max(imgRatio, 0.55), 1.85);

    this.plane.scale.y = baseH;
    this.plane.scale.x = baseH * clampedRatio;

    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];

    // Padding now scales with each card's own width so gap stays
    // consistent across narrow and wide images — fixes overlap
    this.padding = this.plane.scale.x * 0.4;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(container, { items, bend, borderRadius = 0, scrollSpeed = 2, scrollEase = 0.05 } = {}) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.items = items;
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, borderRadius);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
  }

  createMedias(items, bend = 1, borderRadius) {
    const galleryItems = items && items.length ? items : [];
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        bend,
        borderRadius,
      });
    });
  }

  getHoveredIndex(clientX, clientY) {
    if (!this.medias) return -1;
    const rect = this.container.getBoundingClientRect();
    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;
    const fov = (this.camera.fov * Math.PI) / 180;
    const worldH = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const worldW = worldH * this.camera.aspect;
    const worldX = ndcX * (worldW / 2);
    const worldY = ndcY * (worldH / 2);
    for (let i = 0; i < this.medias.length; i++) {
      const m = this.medias[i];
      const px = m.plane.position.x;
      const py = m.plane.position.y;
      const hw = m.plane.scale.x / 2;
      const hh = m.plane.scale.y / 2;
      if (worldX >= px - hw && worldX <= px + hw && worldY >= py - hh && worldY <= py + hh) {
        return i % (this.mediasImages.length / 2);
      }
    }
    return -1;
  }

  getCardScreenRect(index) {
    if (!this.medias) return null;
    const m = this.medias[index];
    if (!m) return null;
    return m.getScreenRect(this.camera, this.screen);
  }

  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize    = this.onResize.bind(this);
    this.boundOnWheel     = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp   = this.onTouchUp.bind(this);
    window.addEventListener('resize',      this.boundOnResize);
    window.addEventListener('mousewheel',  this.boundOnWheel);
    window.addEventListener('wheel',       this.boundOnWheel);
    window.addEventListener('mousedown',   this.boundOnTouchDown);
    window.addEventListener('mousemove',   this.boundOnTouchMove);
    window.addEventListener('mouseup',     this.boundOnTouchUp);
    window.addEventListener('touchstart',  this.boundOnTouchDown);
    window.addEventListener('touchmove',   this.boundOnTouchMove);
    window.addEventListener('touchend',    this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize',      this.boundOnResize);
    window.removeEventListener('mousewheel',  this.boundOnWheel);
    window.removeEventListener('wheel',       this.boundOnWheel);
    window.removeEventListener('mousedown',   this.boundOnTouchDown);
    window.removeEventListener('mousemove',   this.boundOnTouchMove);
    window.removeEventListener('mouseup',     this.boundOnTouchUp);
    window.removeEventListener('touchstart',  this.boundOnTouchDown);
    window.removeEventListener('touchmove',   this.boundOnTouchMove);
    window.removeEventListener('touchend',    this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

const HOLD_DURATION = 2000;

function CircularGallery({
  items,
  bend = 1,
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05
}) {
  const containerRef     = useRef(null);
  const appRef           = useRef(null);
  const holdTimerRef     = useRef(null);
  const animFrameRef     = useRef(null);
  const holdStartTimeRef = useRef(null);

  // Hold-progress bar: driven entirely via direct DOM refs, NOT React state.
  // Updating state 60x/sec during a hold would trigger 60 re-renders/sec;
  // instead we mutate style properties directly on the node every frame,
  // which the browser can composite without touching React's render tree.
  const barRef  = useRef(null);
  const fillRef = useRef(null);

  // Only two lightweight state values remain: whether the bar should be
  // mounted at all, and the fully-resolved modal item. Both change rarely.
  const [holdVisible, setHoldVisible] = useState(false);
  const [modal, setModal] = useState(null);

  const cancelHold = useCallback(() => {
    if (holdTimerRef.current) { clearTimeout(holdTimerRef.current); holdTimerRef.current = null; }
    if (animFrameRef.current) { cancelAnimationFrame(animFrameRef.current); animFrameRef.current = null; }
    holdStartTimeRef.current = null;
    setHoldVisible(false);
  }, []);

  const startHold = useCallback((idx, rect) => {
    cancelHold();
    const { cx, cy, pw, ph } = rect;
    holdStartTimeRef.current = performance.now();
    setHoldVisible(true);

    const animate = (now) => {
      const elapsed = now - holdStartTimeRef.current;
      const pct      = Math.min(elapsed / HOLD_DURATION, 1);
      const scaleY   = 0.6 + pct * 0.6;
      const scaleX   = 0.88 + pct * 0.12;
      const glow     = 0.2 + pct * 0.7;
      const glowSize = 4 + pct * 16;

      const bar = barRef.current;
      const fill = fillRef.current;
      if (bar) {
        bar.style.left = `${cx - pw * 0.35}px`;
        bar.style.top = `${cy + ph * 0.5 - 14}px`;
        bar.style.width = `${pw * 0.7}px`;
        bar.style.transform = `scaleY(${scaleY}) scaleX(${scaleX})`;
        bar.style.boxShadow = `0 0 ${glowSize}px rgba(0,122,255,${glow})`;
      }
      if (fill) {
        fill.style.width = `${pct * 100}%`;
        fill.style.boxShadow = `0 0 ${glowSize + 4}px rgba(0,122,255,${glow + 0.1})`;
      }

      if (pct < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    animFrameRef.current = requestAnimationFrame(animate);

    holdTimerRef.current = setTimeout(() => {
      const realIndex = idx % items.length;
      setModal(items[realIndex]);
      cancelHold();
    }, HOLD_DURATION);
  }, [cancelHold, items]);

  const closeModal = useCallback(() => setModal(null), []);
  const stopPropagation = useCallback((e) => e.stopPropagation(), []);

  useEffect(() => {
    appRef.current = new App(containerRef.current, {
      items, bend, borderRadius, scrollSpeed, scrollEase,
    });

    const el = containerRef.current;
    let startX = 0;

    const onDown = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      const idx = appRef.current.getHoveredIndex(clientX, clientY);
      if (idx !== -1) {
        const rect = appRef.current.getCardScreenRect(idx);
        if (rect) startHold(idx, rect);
      }
    };
    const onMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      if (Math.abs(clientX - startX) > 6) cancelHold();
    };
    const onUp = () => cancelHold();

    el.addEventListener('mousedown',  onDown);
    el.addEventListener('touchstart', onDown);
    window.addEventListener('mouseup',    onUp);
    window.addEventListener('touchend',   onUp);
    window.addEventListener('mousemove',  onMove);
    window.addEventListener('touchmove',  onMove);

    return () => {
      appRef.current?.destroy();
      cancelHold();
      el.removeEventListener('mousedown',  onDown);
      el.removeEventListener('touchstart', onDown);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('touchend',  onUp);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
    };
  }, [items, bend, borderRadius, scrollSpeed, scrollEase, startHold, cancelHold]);

  const modalImgStyle = useMemo(() => ({
    maxWidth: 'min(92vw, 920px)',
    maxHeight: 'min(72vh, 680px)',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    borderRadius: '18px',
    boxShadow: '0 48px 120px rgba(0,0,0,0.85), 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
    animation: 'quickLook 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards',
  }), []);

  return (
    <>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <div
          className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
          ref={containerRef}
        />

        {holdVisible && (
          <div
            ref={barRef}
            style={{
              position: 'absolute',
              height: '7px',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '999px',
              pointerEvents: 'none',
              zIndex: 20,
              overflow: 'hidden',
              transformOrigin: 'center',
              willChange: 'transform, box-shadow',
            }}
          >
            <div
              ref={fillRef}
              style={{
                height: '100%',
                width: '0%',
                background: 'linear-gradient(90deg, #007AFF 0%, #34AADC 100%)',
                borderRadius: '999px',
                willChange: 'width, box-shadow',
              }}
            />
          </div>
        )}
      </div>

      {modal && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.82)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            animation: 'bgFadeIn 0.35s ease forwards',
          }}
        >
          <style>{`
            @keyframes bgFadeIn {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes quickLook {
              0%   { opacity: 0; transform: scale(0.82) translateY(40px); filter: blur(10px); }
              45%  { opacity: 1; filter: blur(0px); }
              70%  { transform: scale(1.03) translateY(-6px); }
              100% { transform: scale(1) translateY(0); }
            }
            @keyframes descSlide {
              from { opacity: 0; transform: translateY(14px); filter: blur(4px); }
              to   { opacity: 1; transform: translateY(0);    filter: blur(0px); }
            }
          `}</style>

          <div
            onClick={stopPropagation}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '0 16px' }}
          >
            <img
              src={modal.image}
              alt={modal.text}
              style={modalImgStyle}
            />
            <div
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '16px',
                padding: '16px 28px',
                width: 'min(92vw, 920px)',
                color: '#fff',
                animation: 'descSlide 0.5s ease 0.25s both',
              }}
            >
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '20px', marginBottom: '6px' }}>
                {modal.text}
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>
                {modal.description}
              </div>
            </div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.3)', animation: 'descSlide 0.4s ease 0.4s both' }}>
              Click anywhere to close
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(CircularGallery);