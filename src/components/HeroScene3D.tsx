"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function createRoundedRectGeometry(w: number, h: number, r: number) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const geo = new THREE.ShapeGeometry(shape);
  const uvAttr = geo.attributes.uv;
  for (let i = 0; i < uvAttr.count; i++) {
    const px = uvAttr.getX(i);
    const py = uvAttr.getY(i);
    uvAttr.setXY(i, (px - x) / w, (py - y) / h);
  }
  uvAttr.needsUpdate = true;
  return geo;
}

interface CardConfig {
  image: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  opacity: number;
  entranceDelay: number;
  floatSpeed: number;
  floatOffset: number;
}

const CARDS: CardConfig[] = [
  {
    image: "/images/onboarding5.png",
    x: -4.89,
    y: -0.55,
    z: -0.8,
    width: 2.11,
    height: 2.11 * (585 / 270),
    opacity: 0.5,
    entranceDelay: 0.5,
    floatSpeed: 0.4,
    floatOffset: 2.0,
  },
  {
    image: "/images/onboarding2.png",
    x: -2.5,
    y: 0.0,
    z: -0.4,
    width: 2.11,
    height: 2.11 * (585 / 270),
    opacity: 0.7,
    entranceDelay: 0.2,
    floatSpeed: 0.5,
    floatOffset: 0.8,
  },
  {
    image: "/images/onboarding1.png",
    x: 0,
    y: 0.55,
    z: 0,
    width: 2.34,
    height: 2.34 * (650 / 300),
    opacity: 1.0,
    entranceDelay: 0.0,
    floatSpeed: 0.6,
    floatOffset: 0,
  },
  {
    image: "/images/onboarding4.png",
    x: 2.5,
    y: 0.0,
    z: -0.4,
    width: 2.11,
    height: 2.11 * (585 / 270),
    opacity: 0.7,
    entranceDelay: 0.3,
    floatSpeed: 0.5,
    floatOffset: 1.2,
  },
  {
    image: "/images/onboarding3.png",
    x: 4.89,
    y: -0.55,
    z: -0.8,
    width: 2.11,
    height: 2.11 * (585 / 270),
    opacity: 0.5,
    entranceDelay: 0.6,
    floatSpeed: 0.4,
    floatOffset: 2.5,
  },
];

function PhoneCard({ config, mouse }: { config: CardConfig; mouse: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const screenMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const shadowMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const startTime = useRef(-1);
  const [hovered, setHovered] = useState(false);
  const currentScale = useRef(0);
  const currentY = useRef(config.y - 3);

  const texture = useTexture(config.image);
  texture.colorSpace = THREE.SRGBColorSpace;

  const shadowOffsetX = -config.width * 0.04;
  const shadowOffsetY = -config.width * 0.05;
  const radius = config.width * 0.08;

  const screenGeo = useMemo(
    () => createRoundedRectGeometry(config.width, config.height, radius),
    [config.width, config.height, radius]
  );
  const shadowGeo = useMemo(
    () => createRoundedRectGeometry(config.width * 1.03, config.height * 1.01, radius * 1.15),
    [config.width, config.height, radius]
  );

  useFrame((state) => {
    if (!groupRef.current) return;

    if (startTime.current < 0) startTime.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startTime.current;

    const delayedTime = Math.max(0, elapsed - config.entranceDelay);
    const entranceT = Math.min(1, delayedTime / 0.8);
    const eased = 1 - Math.pow(1 - entranceT, 3);

    const targetScale = hovered ? 1.05 : 1.0;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale * eased, 0.1);

    const floatY = Math.sin(state.clock.elapsedTime * config.floatSpeed + config.floatOffset) * 0.12;
    const targetY = config.y + floatY;
    const entranceY = config.y - 3 + (targetY - (config.y - 3)) * eased;
    currentY.current = THREE.MathUtils.lerp(currentY.current, entranceY, 0.12);

    groupRef.current.position.y = currentY.current;
    groupRef.current.scale.setScalar(currentScale.current);

    const m = mouse.current ?? { x: 0, y: 0 };
    const cardTiltX = -m.y * 0.03;
    const cardTiltY = m.x * 0.04;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, cardTiltX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, cardTiltY, 0.05);

    if (screenMatRef.current) {
      screenMatRef.current.opacity = config.opacity * eased;
    }
    if (shadowMatRef.current) {
      shadowMatRef.current.opacity = config.opacity * 0.35 * eased;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[config.x, config.y - 3, config.z]}
      scale={0}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Shadow card — rounded, offset behind */}
      <mesh position={[shadowOffsetX, shadowOffsetY, -0.02]} geometry={shadowGeo}>
        <meshBasicMaterial
          ref={shadowMatRef}
          color="#d8d8e4"
          transparent
          opacity={0}
        />
      </mesh>
      {/* Phone screen — rounded with the screenshot */}
      <mesh geometry={screenGeo}>
        <meshBasicMaterial
          ref={screenMatRef}
          map={texture}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Scene({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const m = mouse.current ?? { x: 0, y: 0 };
    const targetRotY = m.x * 0.06;
    const targetRotX = -m.y * 0.04;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.04);
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} />
      <directionalLight position={[-3, 4, -2]} intensity={0.2} />
      <group ref={groupRef}>
        {CARDS.map((card, i) => (
          <PhoneCard key={i} config={card} mouse={mouse} />
        ))}
      </group>
    </>
  );
}

function CameraSetup() {
  const { camera, size } = useThree();
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      const aspect = size.width / size.height;
      const desiredWorldWidth = 12;
      const dist = desiredWorldWidth / (2 * Math.tan((camera.fov * Math.PI) / 360) * aspect);
      camera.position.set(0, 0, dist);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [camera, size]);
  return null;
}

export default function HeroScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouse.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
  };

  const handlePointerLeave = () => {
    mouse.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[1600px] aspect-[1280/750]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {mounted && (
        <Canvas
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          camera={{ fov: 45, near: 0.1, far: 100 }}
          style={{ background: "transparent" }}
        >
          <CameraSetup />
          <Scene mouse={mouse} />
        </Canvas>
      )}
    </div>
  );
}
