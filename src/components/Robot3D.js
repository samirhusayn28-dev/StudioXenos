import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Converts Three.js world position → CSS pixel coords relative to the canvas
function worldToCSS(worldPos, camera, canvasW, canvasH) {
  const vec = worldPos.clone().project(camera);
  return {
    x: ((vec.x + 1) / 2) * canvasW,
    y: ((-vec.y + 1) / 2) * canvasH,
  };
}

function Model({ mouseX, mouseY, shadowRef, glowRef }) {
  const { scene }       = useGLTF("/robot.glb");
  const groupRef        = useRef();
  const { camera, size } = useThree();
  const worldCenter     = useRef(new THREE.Vector3());

  const smoothX = useRef(0);
  const smoothY = useRef(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    smoothX.current = lerp(smoothX.current, mouseX.current, 0.04);
    smoothY.current = lerp(smoothY.current, mouseY.current, 0.04);

    const floatY = Math.sin(t * 0.9) * 0.18;

    groupRef.current.position.x = smoothX.current * 0.6;
    groupRef.current.position.y = floatY - 1.3 + smoothY.current * 0.1;

    groupRef.current.rotation.y =
      Math.sin(t * 0.35) * 0.2 + smoothX.current * 0.35;
    groupRef.current.rotation.x = smoothY.current * 0.1;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;

    // ── Ground shadow ────────────────────────────────────────
    if (shadowRef.current) {
      const xOffset = smoothX.current * 38;
      const yOffset = -floatY * 14;
      const scale   = Math.max(0.55, 1 - (floatY + 0.18) * 0.35);
      const blur    = Math.max(12, 22 + floatY * 14);
      const opacity = Math.max(0.50, 0.70 - floatY * 0.2);

      shadowRef.current.style.transform = `translate(calc(-50% + ${xOffset}px), ${yOffset}px)`;
      shadowRef.current.style.width     = `${320 * scale}px`;
      shadowRef.current.style.filter    = `blur(${blur}px)`;
      shadowRef.current.style.opacity   = opacity;
    }

    // ── Glow — exact robot screen position via world→CSS projection ──
    if (glowRef.current) {
      // Sample robot's world-space position; offset Y up to hit torso center
      // groupRef base is at feet level (-1.3 offset), so +2.0 brings us to chest
      groupRef.current.getWorldPosition(worldCenter.current);
      worldCenter.current.y += 1.2;

      const css = worldToCSS(worldCenter.current, camera, size.width, size.height);

      const glowSize = 640 + floatY * 40;
      const opacity  = Math.max(0.60, 0.90 - Math.abs(floatY) * 0.20);

      // Drive left/top so glow center = exact robot pixel position
      glowRef.current.style.left    = `${css.x}px`;
      glowRef.current.style.top     = `${css.y}px`;
      glowRef.current.style.width   = `${glowSize}px`;
      glowRef.current.style.height  = `${glowSize}px`;
      glowRef.current.style.opacity = opacity;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.6} />
    </group>
  );
}

export default function Robot3D() {
  const mouseX       = useRef(0);
  const mouseY       = useRef(0);
  const containerRef = useRef(null);
  const shadowRef    = useRef(null);
  const glowRef      = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect     = containerRef.current.getBoundingClientRect();
      mouseX.current =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouseY.current = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    };
    const reset = () => { mouseX.current = 0; mouseY.current = 0; };

    const el = containerRef.current;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}
    >
      {/*
        Glow div — left/top driven by useFrame to match robot's
        exact projected screen coordinates. transform keeps it centered.
        Starts at -9999px to avoid a flash on first render.
      */}
      <div
        ref={glowRef}
        style={{
          position:      "absolute",
          left:          "-9999px",
          top:           "-9999px",
          transform:     "translate(-50%, -50%)",
          width:         "640px",
          height:        "640px",
          borderRadius:  "50%",
          background: `radial-gradient(ellipse at center,
            rgba(49,92,253,0.62)  0%,
            rgba(90,50,220,0.36) 28%,
            rgba(49,92,253,0.13) 56%,
            transparent          74%)`,
          filter:        "blur(54px)",
          pointerEvents: "none",
          zIndex:        0,
          willChange:    "left, top, opacity, width, height",
        }}
      />

      {/* Three.js Canvas sits above glow */}
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 52 }}
        style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[5, 8, 5]}   intensity={2.0} />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} />
        <pointLight       position={[0, 4, 4]}   intensity={0.4} />
        <Model
          mouseX={mouseX}
          mouseY={mouseY}
          shadowRef={shadowRef}
          glowRef={glowRef}
        />
      </Canvas>

      {/* Ground shadow */}
      <div
        ref={shadowRef}
        style={{
          position:      "absolute",
          bottom:        "8%",
          left:          "50%",
          transform:     "translateX(-50%)",
          width:         "280px",
          height:        "30px",
          background:    "rgba(0,0,0,0.6)",
          filter:        "blur(22px)",
          borderRadius:  "50%",
          pointerEvents: "none",
          zIndex:        2,
        }}
      />
    </div>
  );
}