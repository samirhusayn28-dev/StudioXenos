'use client';

import React, { useRef, useEffect, useState, useMemo, memo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function lerp(a, b, t) {
    return a + (b - a) * t;
}

const robotStyles = `
  @keyframes robotFloatContainer {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50%      { transform: translate3d(0, -10px, 0); }
  }

  @keyframes robotFloatGlow {
    0%, 100% { transform: translate3d(-50%, -50%, 0) scale(1); opacity: 0.5; }
    50%      { transform: translate3d(-50%, -50%, 0) scale(1.04); opacity: 0.7; }
  }

  @keyframes robotFloatShadow {
    0%, 100% { transform: translate3d(-50%, 0, 0) scale(1); opacity: 0.50; }
    50%      { transform: translate3d(-50%, 0, 0) scale(0.85); opacity: 0.30; }
  }

  @keyframes pulseGlow {
    0%, 100% { transform: translate3d(-50%, -50%, 0) scale(0.8); opacity: 0.3; }
    50%      { transform: translate3d(-50%, -50%, 0) scale(1.2); opacity: 0.8; }
  }

  .robot-wrapper-anim {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    transform: translateZ(0);
    will-change: transform;
    animation: robotFloatContainer 4s ease-in-out infinite;
  }

  .robot-pure-glow {
    position: absolute;
    top: 45%;
    left: 50%;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(43,104,246,0.3) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    will-change: opacity;
    animation: robotFloatGlow 4s ease-in-out infinite;
  }

  .robot-pure-shadow {
    position: absolute;
    bottom: 8%;
    left: 50%;
    width: 200px;
    height: 16px;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 75%);
    pointer-events: none;
    z-index: 2;
    will-change: opacity;
    animation: robotFloatShadow 4s ease-in-out infinite;
  }

  .robot-html-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(43,104,246,0.6) 0%, transparent 70%);
    pointer-events: none;
    z-index: 10;
    animation: pulseGlow 1.5s ease-in-out infinite;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .robot-canvas-wrap {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.8s ease-in-out;
  }
  
  .robot-canvas-wrap.is-ready {
    opacity: 1;
  }

  @media (max-width: 767px) {
    .robot-pure-shadow { width: 120px; bottom: 4%; }
  }
`;

const Model = memo(function Model({ mouseX, mouseY, isMobile, isHovered, onLoaded }) {
    const { scene } = useGLTF("/assets/robot-optimized.glb");
    const groupRef = useRef();

    const smoothX = useRef(0);
    const smoothY = useRef(0);

    const modelScale = isMobile ? 1.0 : 1.5;
    const baseY = isMobile ? -0.8 : -1.2;
    const lerpSpeed = isMobile ? 0.03 : 0.08;

    useEffect(() => {
        if (!scene) return;
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = false;
                child.receiveShadow = false;
                child.matrixAutoUpdate = false;
                child.updateMatrix();

                if (child.material) {
                    child.material.roughness = 0.5;
                    child.material.metalness = 0.5;
                    child.material.precision = "mediump";
                }
            }
        });

        // Tell the parent component that the model is fully parsed and mounted
        onLoaded();
    }, [scene, onLoaded]);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();

        const targetX = isHovered ? mouseX.current : 0;
        const targetY = isHovered ? mouseY.current : 0;

        smoothX.current = lerp(smoothX.current, targetX, lerpSpeed);
        smoothY.current = lerp(smoothY.current, targetY, lerpSpeed);

        groupRef.current.position.x = isMobile ? 0 : smoothX.current * 0.5;
        groupRef.current.position.y = baseY + smoothY.current * 0.08;

        groupRef.current.rotation.y = isMobile
            ? Math.sin(t * 0.4) * 0.12
            : Math.sin(t * 0.4) * 0.15 + smoothX.current * 0.3;
        groupRef.current.rotation.x = isMobile ? 0 : smoothY.current * 0.08;
    });

    return (
        <group ref={groupRef}>
            <primitive object={scene} scale={modelScale} />
        </group>
    );
});

useGLTF.preload("/assets/robot-optimized.glb");

export default function Robot3D({ isHeroVisible = true }) {
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const containerRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // New state to track when the model is actually ready to be shown
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 767px)");
        const update = (e) => setIsMobile(e.matches);
        setIsMobile(mql.matches);
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el || isMobile) return;

        let rafId = null;

        const handleMouseMove = (e) => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    mouseX.current = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                    mouseY.current = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                }
                rafId = null;
            });
        };

        el.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isMobile]);

    const cameraConfig = useMemo(() => ({
        position: [0, 0, isMobile ? 6.5 : 5.2],
        fov: isMobile ? 44 : 50,
    }), [isMobile]);

    const canvasStyle = useMemo(() => ({
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 1,
        pointerEvents: "none",
        transform: "translateZ(0)",
    }), []);

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ width: "100%", height: "100%", position: "relative" }}
        >
            <style>{robotStyles}</style>

            <div className="robot-wrapper-anim">
                {!isMobile && <div className="robot-pure-glow" />}

                {/* Standard HTML Loader: Visible immediately, fades out when isReady is true */}
                <div
                    className="robot-html-loader"
                    style={{
                        opacity: isReady ? 0 : 1,
                        transform: isReady ? 'translate3d(-50%, -50%, 0) scale(0.5)' : 'translate3d(-50%, -50%, 0) scale(1)'
                    }}
                />

                <div className={`robot-canvas-wrap ${isReady ? 'is-ready' : ''}`}>
                    <Canvas
                        camera={cameraConfig}
                        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1.5) : 1}
                        frameloop={isHeroVisible || isHovered ? "always" : "never"}
                        gl={{
                            antialias: false,
                            powerPreference: "high-performance",
                            alpha: true,
                            stencil: false,
                            depth: true,
                        }}
                        style={canvasStyle}
                    >
                        <ambientLight intensity={isMobile ? 1.6 : 1.2} />
                        <directionalLight position={[4, 6, 4]} intensity={1.8} />
                        {!isMobile && <directionalLight position={[-3, 1, -2]} intensity={0.5} />}

                        <Suspense fallback={null}>
                            <Model
                                mouseX={mouseX}
                                mouseY={mouseY}
                                isMobile={isMobile}
                                isHovered={isHovered}
                                onLoaded={() => setIsReady(true)}
                            />
                        </Suspense>
                    </Canvas>
                </div>

                <div className="robot-pure-shadow" style={{ opacity: isReady ? '' : 0, transition: 'opacity 0.8s ease' }} />
            </div>
        </div>
    );
}