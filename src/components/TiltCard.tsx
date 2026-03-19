"use client";

import { useRef, useCallback, useEffect } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  shine?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  scale = 1.03,
  perspective = 1000,
  shine = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const target = useRef({ rx: 0, ry: 0, sx: 1, sy: 1, shineX: 50, shineY: 50 });
  const current = useRef({ rx: 0, ry: 0, s: 1, shineX: 50, shineY: 50 });
  const isHovered = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    const c = current.current;
    const t = target.current;
    const ease = 0.1;

    c.rx = lerp(c.rx, isHovered.current ? t.rx : 0, ease);
    c.ry = lerp(c.ry, isHovered.current ? t.ry : 0, ease);
    c.s = lerp(c.s, isHovered.current ? scale : 1, ease);
    c.shineX = lerp(c.shineX, t.shineX, ease);
    c.shineY = lerp(c.shineY, t.shineY, ease);

    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) scale3d(${c.s}, ${c.s}, ${c.s})`;
    }

    if (shineRef.current) {
      const shineOpacity = isHovered.current ? 0.15 : 0;
      const currentOpacity = parseFloat(shineRef.current.style.opacity || "0");
      const newOpacity = lerp(currentOpacity, shineOpacity, ease);
      shineRef.current.style.opacity = String(newOpacity);
      shineRef.current.style.background = `radial-gradient(circle at ${c.shineX}% ${c.shineY}%, rgba(255,255,255,0.6) 0%, transparent 60%)`;
    }

    raf.current = requestAnimationFrame(animate);
  }, [perspective, scale]);

  useEffect(() => {
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [animate]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    target.current.ry = nx * maxTilt;
    target.current.rx = -ny * maxTilt;
    target.current.shineX = ((e.clientX - rect.left) / rect.width) * 100;
    target.current.shineY = ((e.clientY - rect.top) / rect.height) * 100;
  };

  const handlePointerEnter = () => {
    isHovered.current = true;
  };

  const handlePointerLeave = () => {
    isHovered.current = false;
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-shadow duration-300 ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {children}
      {shine && (
        <div
          ref={shineRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-20"
          style={{ opacity: 0 }}
        />
      )}
    </div>
  );
}
