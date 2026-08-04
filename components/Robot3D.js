'use client';

import React, { useRef, useEffect, useState, useMemo, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function lerp(a, b, t) {
    return a + (b - a) * t;
}

const robotStyles = `
  @keyframes robotFloatContainer {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50%      { transform: translate3d(0, -14px, 0); }
  }

  @keyframes robotFloatGlow {
    0%, 100% { transform: translate3d(-50%, -50%, 0) scale(1); opacity: 0.65; }
    50%      { transform: translate3d(-50%, -50%, 0) scale(1.08); opacity: 0.85; }
  }

  @keyframes robotFloatShadow {
    0%, 100% { transform: translate3d(-50%, 0, 0) scale(1); opacity: 0.60; }
    50%      { transform: translate3d(-50%, 0, 0) scale(0.82); opacity: 0.40; }
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
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(49,92,253,0.45) 0%, rgba(90,50,220,0.2) 40%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    will-change: transform, opacity;
    animation: robotFloatGlow 4s ease-in-out infinite;
  }

  .robot-pure-shadow {
    position: absolute;
    bottom: 8%;
    left: 50%;
    width: 240px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 75%);
    pointer-events: none;
    z-index: 2;
    will-change: transform, opacity;
    animation: robotFloatShadow 4s ease-in-out infinite;
  }

  @media (max-width: 767px) {
    .robot-pure-shadow { width: 140px; bottom: 4%; }
  }
`;

const Model = memo(function Model({ mouseX, mouseY, isMobile, isHeroVisible }) {
    const { scene } = useGLTF("/robot.glb");
    const groupRef = useRef();

    const smoothX = useRef(0);
    const smoothY = useRef(0);

    const modelScale = isMobile ? 1.0 : 1.5;
    const baseY = isMobile ? -0.8 : -1.2;
    const lerpSpeed = isMobile ? 0.03 : 0.06;

    useEffect(() => {
        if (!scene) return;
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = false;
                child.receiveShadow = false;
                if (child.material) {
                    child.material.precision = "mediump";
                }
            }
        });
    }, [scene]);

    // Lightweight frame handler focused purely on mouse interaction and minor stabilization
    useFrame((state) => {
        if (!groupRef.current || !isHeroVisible) return;
        const t = state.clock.getElapsedTime();

        smoothX.current = lerp(smoothX.current, mouseX.current, lerpSpeed);
        smoothY.current = lerp(smoothY.current, mouseY.current, lerpSpeed);

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

useGLTF.preload("/robot.glb");

export default function Robot3D({ isHeroVisible = true }) {
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const containerRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);
    const [elementInView, setElementInView] = useState(true);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 767px)");
        const update = (e) => setIsMobile(e.matches);
        setIsMobile(mql.matches);
        if (mql.addEventListener) {
            mql.addEventListener("change", update);
        } else {
            mql.addListener(update);
        }
        return () => {
            if (mql.removeEventListener) {
                mql.removeEventListener("change", update);
            } else {
                mql.removeListener(update);
            }
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setElementInView(entry.isIntersecting),
            { threshold: 0.05 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
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

        const resetMouse = () => {
            mouseX.current = 0;
            mouseY.current = 0;
        };

        el.addEventListener("mousemove", handleMouseMove, { passive: true });
        el.addEventListener("mouseleave", resetMouse);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", resetMouse);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isMobile]);

    const isActive = isHeroVisible && elementInView;
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
        <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
            <style>{robotStyles}</style>

            <div
                className="robot-wrapper-anim"
                style={{ animationPlayState: isActive ? 'running' : 'paused' }}
            >
                {!isMobile && (
                    <div
                        className="robot-pure-glow"
                        style={{ animationPlayState: isActive ? 'running' : 'paused' }}
                    />
                )}

                <Canvas
                    camera={cameraConfig}
                    dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.1) : 1}
                    frameloop={isActive ? "always" : "demand"}
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

                    <Model
                        mouseX={mouseX}
                        mouseY={mouseY}
                        isMobile={isMobile}
                        isHeroVisible={isActive}
                    />
                </Canvas>

                <div
                    className="robot-pure-shadow"
                    style={{ animationPlayState: isActive ? 'running' : 'paused' }}
                />
            </div>
        </div>
    );
}