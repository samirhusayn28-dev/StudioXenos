import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function Model({ mouseX, mouseY, shadowRef }) {
  const { scene } = useGLTF("/robot.glb");
  const groupRef = useRef();

  const smoothX = useRef(0);
  const smoothY = useRef(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    smoothX.current = lerp(smoothX.current, mouseX.current, 0.06);
    smoothY.current = lerp(smoothY.current, mouseY.current, 0.06);

    // 🔥 RIGHT + CLEARLY DOWN
    groupRef.current.position.x = 0.8 + smoothX.current * 0.8;

    groupRef.current.position.y =
      Math.sin(t) * 0.1 - 1.1 + smoothY.current * 0.4; // 👈 strong down

    groupRef.current.rotation.y =
      Math.sin(t * 0.4) * 0.25 + smoothX.current * 0.3;
    groupRef.current.rotation.x = smoothY.current * 0.15;

    // 🔥 SHADOW
    if (shadowRef.current) {
      const floatY = Math.sin(t) * 0.1;
      const totalY = smoothY.current * 0.4 + floatY;

      const xOffset = smoothX.current * 60;
      const yOffset = totalY * 20;

      const scale = Math.max(0.7, 1 - totalY * 0.3);
      const blur = Math.max(12, 20 + totalY * 12);
      const opacity = Math.max(0.2, 0.45 - totalY * 0.05);

      shadowRef.current.style.transform = `
        translate(calc(-50% + ${xOffset}px), ${yOffset}px)
      `;
      shadowRef.current.style.width = `${260 * scale}px`;
      shadowRef.current.style.filter = `blur(${blur}px)`;
      shadowRef.current.style.opacity = opacity;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.8} />
    </group>
  );
}

export default function Robot3D() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const containerRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();

      mouseX.current = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY.current = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const reset = () => {
      mouseX.current = 0;
      mouseY.current = 0;
    };

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
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <Canvas
        camera={{ position: [0, -1, 10], fov: 40 }} // 👈 camera bhi neeche
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} />
        <directionalLight position={[-3, 2, -2]} intensity={0.5} />

        <Model mouseX={mouseX} mouseY={mouseY} shadowRef={shadowRef} />
      </Canvas>

      {/* 🔥 SHADOW (LOWER + BIGGER) */}
      <div
        ref={shadowRef}
        style={{
          position: "absolute",
          bottom: "3%", // 👈 ground ke paas
          left: "50%",
          transform: "translateX(-50%)",
          width: "260px",
          height: "35px",
          background: "rgba(0, 0, 0, 0.6)",
          filter: "blur(20px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}