"use client";

import { useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import type { Group } from "three";

/**
 * A realistic, softly-lit 3D bed rendered with image-based lighting (HDRI
 * environment), physically-based upholstery/quilting materials and soft contact
 * shadows. It gently floats and slowly rotates on a transparent background so it
 * reads like a real furniture product render — not flat clip-art.
 */

const TONES = {
  upholstery: "#4c2f57", // plum velvet frame + headboard
  upholsteryDark: "#37213f", // tufting buttons / shadows
  mattress: "#f5f0e8", // quilted ivory top
  piping: "#e6dccd", // mattress side band
  duvet: "#b9a4c7", // soft lavender throw
  pillow: "#fcfaf6", // plush pillows
  wood: "#4a3626" // walnut legs
};

function TuftButtons({ points, radius = 0.045 }: { points: [number, number, number][]; radius?: number }) {
  return (
    <>
      {points.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <sphereGeometry args={[radius, 16, 16]} />
          <meshStandardMaterial color={TONES.upholsteryDark} roughness={0.45} metalness={0} />
        </mesh>
      ))}
    </>
  );
}

function Bed({ spin }: { spin: boolean }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (spin && group.current) {
      group.current.rotation.y += delta * 0.3;
    }
  });

  // Diamond-tufted buttons on the padded headboard.
  const headboardButtons = useMemo<[number, number, number][]>(() => {
    const pts: [number, number, number][] = [];
    for (let row = 0; row < 3; row++) {
      const y = 0.15 + row * 0.42;
      const offset = row % 2 === 0 ? 0 : 0.42;
      for (let col = -1; col <= 1; col++) {
        pts.push([col * 0.84 + offset - 0.14, y, 0.17]);
      }
    }
    return pts;
  }, []);

  // Quilt buttons dotted across the mattress top.
  const mattressButtons = useMemo<[number, number, number][]>(() => {
    const pts: [number, number, number][] = [];
    for (let x = -1; x <= 1; x++) {
      for (let z = -1; z <= 1; z++) {
        pts.push([x * 0.85, 0.47, z * 1.0 + 0.05]);
      }
    }
    return pts;
  }, []);

  return (
    <group ref={group} rotation={[0, -0.5, 0]} position={[0, -0.35, 0]} scale={0.7}>
      {/* Padded, tufted headboard */}
      <group position={[0, 0.7, -1.95]}>
        <RoundedBox args={[3.15, 1.75, 0.32]} radius={0.16} smoothness={6} castShadow receiveShadow>
          <meshStandardMaterial color={TONES.upholstery} roughness={0.62} metalness={0} envMapIntensity={0.7} />
        </RoundedBox>
        <TuftButtons points={headboardButtons.map(([x, y, z]) => [x, y - 0.2, z])} />
      </group>

      {/* Upholstered bed base / frame */}
      <RoundedBox
        args={[3.2, 0.62, 4.05]}
        radius={0.14}
        smoothness={5}
        position={[0, -0.28, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={TONES.upholstery} roughness={0.6} metalness={0} envMapIntensity={0.6} />
      </RoundedBox>

      {/* Mattress side band / piping */}
      <RoundedBox args={[2.94, 0.5, 3.82]} radius={0.14} smoothness={5} position={[0, 0.12, 0.05]} castShadow>
        <meshStandardMaterial color={TONES.piping} roughness={0.85} metalness={0} envMapIntensity={0.4} />
      </RoundedBox>

      {/* Quilted mattress top */}
      <RoundedBox args={[2.9, 0.42, 3.78]} radius={0.16} smoothness={6} position={[0, 0.3, 0.05]} castShadow>
        <meshStandardMaterial color={TONES.mattress} roughness={0.88} metalness={0} envMapIntensity={0.4} />
      </RoundedBox>
      <TuftButtons points={mattressButtons} radius={0.035} />

      {/* Folded duvet across the lower third, with a rolled top edge */}
      <group position={[0, 0.42, 1.05]}>
        <RoundedBox args={[2.92, 0.26, 1.55]} radius={0.12} smoothness={5} castShadow>
          <meshStandardMaterial color={TONES.duvet} roughness={0.8} metalness={0} envMapIntensity={0.5} />
        </RoundedBox>
        <mesh position={[0, 0.1, -0.78]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 2.92, 24]} />
          <meshStandardMaterial color={TONES.duvet} roughness={0.8} metalness={0} envMapIntensity={0.5} />
        </mesh>
      </group>

      {/* Two plush pillows, slightly angled */}
      <group position={[0, 0.62, -1.25]}>
        <RoundedBox
          args={[1.2, 0.36, 0.78]}
          radius={0.17}
          smoothness={6}
          position={[-0.7, 0, 0]}
          rotation={[0.08, 0.14, 0.05]}
          castShadow
        >
          <meshStandardMaterial color={TONES.pillow} roughness={0.9} metalness={0} envMapIntensity={0.35} />
        </RoundedBox>
        <RoundedBox
          args={[1.2, 0.36, 0.78]}
          radius={0.17}
          smoothness={6}
          position={[0.7, 0, 0]}
          rotation={[0.08, -0.14, -0.05]}
          castShadow
        >
          <meshStandardMaterial color={TONES.pillow} roughness={0.9} metalness={0} envMapIntensity={0.35} />
        </RoundedBox>
      </group>

      {/* Tapered walnut legs */}
      {(
        [
          [-1.45, -0.78, 1.82],
          [1.45, -0.78, 1.82],
          [-1.45, -0.78, -1.82],
          [1.45, -0.78, -1.82]
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.1, 0.06, 0.5, 20]} />
          <meshStandardMaterial color={TONES.wood} roughness={0.45} metalness={0.1} envMapIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroBed3D() {
  const reduceMotion = useReducedMotion();
  const [isMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 640px)").matches : false
  );

  return (
    <Canvas
      className="!absolute inset-0"
      shadows
      camera={{ position: [4.4, 2.7, 6.2], fov: 30 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      {/* Procedural image-based lighting (no external HDRI) for realistic soft
          reflections + fill — reliable offline / on the edge. */}
      <Suspense fallback={null}>
        <Environment resolution={256} environmentIntensity={0.85}>
          <Lightformer intensity={2.2} position={[0, 5, -3]} scale={[12, 6, 1]} color="#fff6ea" />
          <Lightformer intensity={1.1} position={[-5, 2, 3]} scale={[5, 5, 1]} color="#efe0f5" />
          <Lightformer intensity={0.9} position={[5, 1, 2]} scale={[5, 5, 1]} color="#ffffff" />
          <Lightformer intensity={0.6} position={[0, -3, 2]} scale={[10, 4, 1]} color="#d9c7e6" />
        </Environment>
      </Suspense>

      <ambientLight intensity={0.25} />
      <directionalLight
        position={[4, 7, 4]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      >
        <orthographicCamera attach="shadow-camera" args={[-6, 6, 6, -6, 0.1, 20]} />
      </directionalLight>
      <directionalLight position={[-5, 3, -3]} intensity={0.4} color="#d8c3e6" />

      <Float
        speed={reduceMotion ? 0 : 1.1}
        rotationIntensity={reduceMotion ? 0 : 0.14}
        floatIntensity={reduceMotion ? 0 : 0.4}
        floatingRange={[-0.04, 0.08]}
      >
        <Suspense fallback={null}>
          <Bed spin={!reduceMotion} />
        </Suspense>
      </Float>

      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.4}
        scale={10}
        blur={2.8}
        far={4.5}
        resolution={1024}
        color="#2c1a33"
      />
    </Canvas>
  );
}
