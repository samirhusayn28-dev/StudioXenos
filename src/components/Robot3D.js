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

    smoothX.current = lerp(smoothX.current, mouseX.current, 0.04);
    smoothY.current = lerp(smoothY.current, mouseY.current, 0.04);

    const floatY = Math.sin(t * 0.9) * 0.18;

    groupRef.current.position.x = smoothX.current * 0.6;
    groupRef.current.position.y = floatY - 1.3 + smoothY.current * 0.1;

    groupRef.current.rotation.y =
      Math.sin(t * 0.35) * 0.2 + smoothX.current * 0.35;
    groupRef.current.rotation.x = smoothY.current * 0.1;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;

    if (shadowRef.current) {
      const xOffset = smoothX.current * 38;
      const yOffset = -floatY * 14;

      const scale = Math.max(0.55, 1 - (floatY + 0.18) * 0.35);
      const blur = Math.max(12, 22 + floatY * 14);
      const opacity = Math.max(0.5, 0.7 - floatY * 0.2);

      shadowRef.current.style.transform = `translate(calc(-50% + ${xOffset}px), ${yOffset}px)`;
      shadowRef.current.style.width = `${320 * scale}px`;
      shadowRef.current.style.filter = `blur(${blur}px)`;
      shadowRef.current.style.opacity = opacity;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.6} />
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
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden", // 🔥 cut issue fix
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 52 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[5, 8, 5]} intensity={2.0} />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} />
        <pointLight position={[0, 4, 4]} intensity={0.4} />
        <Model mouseX={mouseX} mouseY={mouseY} shadowRef={shadowRef} />
      </Canvas>

      {/* Shadow */}
      <div
        ref={shadowRef}
        style={{
          position: "absolute",
          bottom: "8%", // 🔥 thora neeche kiya taake robot upar lage
          left: "50%",
          transform: "translateX(-50%)",
          width: "280px",
          height: "30px",
          background: "rgba(0, 0, 0, 0.6)",
          filter: "blur(22px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}