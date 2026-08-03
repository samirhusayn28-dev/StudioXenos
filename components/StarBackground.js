// src/components/StarBackground.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';

const hexToRgb = hex => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const int = parseInt(hex, 16);
    return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vRandom = random;
    vColor = color;
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    float circle = smoothstep(0.5, 0.4, d) * 0.8;
    gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
  }
`;

const COLORS = ['#ffffff', '#c47a30', '#aab8ff'];

export default function StarBackground() {
    const containerRef = useRef(null);
    const [isDark, setIsDark] = useState(true);

    // Theme watch
    useEffect(() => {
        const check = () =>
            setIsDark(
                typeof document !== 'undefined'
                    ? document.documentElement.getAttribute('data-theme') !== 'light'
                    : true
            );
        const obs = new MutationObserver(check);
        if (typeof document !== 'undefined') {
            obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        }
        check();
        return () => obs.disconnect();
    }, []);

    // OGL particles
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const lowPower = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;
        const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.5), depth: false, alpha: true });
        const gl = renderer.gl;
        container.appendChild(gl.canvas);
        gl.clearColor(0, 0, 0, 0);

        const camera = new Camera(gl, { fov: 15 });
        camera.position.set(0, 0, 20);

        const resize = () => {
            renderer.setSize(container.clientWidth, container.clientHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        };
        window.addEventListener('resize', resize);
        resize();

        const count = lowPower ? 80 : 200;
        const positions = new Float32Array(count * 3);
        const randoms = new Float32Array(count * 4);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            let x, y, z, len;
            do {
                x = Math.random() * 2 - 1;
                y = Math.random() * 2 - 1;
                z = Math.random() * 2 - 1;
                len = x * x + y * y + z * z;
            } while (len > 1 || len === 0);
            const r = Math.cbrt(Math.random());
            positions.set([x * r, y * r, z * r], i * 3);
            randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
            const col = hexToRgb(COLORS[Math.floor(Math.random() * COLORS.length)]);
            colors.set(col, i * 3);
        }

        const geometry = new Geometry(gl, {
            position: { size: 3, data: positions },
            random: { size: 4, data: randoms },
            color: { size: 3, data: colors },
        });

        const program = new Program(gl, {
            vertex, fragment,
            uniforms: {
                uTime: { value: 0 },
                uSpread: { value: 10 },
                uBaseSize: { value: 80 * (window.devicePixelRatio || 1) },
                uSizeRandomness: { value: 1 },
            },
            transparent: true,
            depthTest: false,
        });

        const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });

        let animId;
        let last = performance.now();
        let elapsed = 0;
        let paused = false;

        const onScroll = () => {
            paused = window.scrollY > window.innerHeight * 0.8;
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        const tick = t => {
            animId = requestAnimationFrame(tick);
            if (paused) {
                last = t;
                return;
            }
            elapsed += (t - last) * 0.1;
            last = t;
            program.uniforms.uTime.value = elapsed * 0.001;
            mesh.rotation.x = Math.sin(elapsed * 0.00002) * 0.1;
            mesh.rotation.y = Math.cos(elapsed * 0.00005) * 0.15;
            mesh.rotation.z += 0.001;
            renderer.render({ scene: mesh, camera });
        };
        animId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', onScroll);
            if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                opacity: 1,
                transition: 'opacity 0.6s ease',
            }}
        />
    );
}