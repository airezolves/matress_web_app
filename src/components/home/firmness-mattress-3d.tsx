"use client";

import { Suspense, useRef, useState } from "react";
import { ContactShadows, Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import type { Group } from "three";

export type FirmnessLabel = "Super Soft" | "Medium Soft" | "Medium" | "Medium Firm";

const presentations: Record<
  FirmnessLabel,
  { sink: number; bulge: number; topHeight: number; top: string; band: string; core: string; accent: string }
> = {
  "Super Soft": {
    sink: 0.5,
    bulge: 0.055,
    topHeight: 0.5,
    top: "#eadff0",
    band: "#cdb8d8",
    core: "#775281",
    accent: "#f3c7b2",
  },
  "Medium Soft": {
    sink: 0.36,
    bulge: 0.04,
    topHeight: 0.4,
    top: "#f3e9e2",
    band: "#d9c8ba",
    core: "#9b6e79",
    accent: "#d7af62",
  },
  Medium: {
    sink: 0.22,
    bulge: 0.025,
    topHeight: 0.32,
    top: "#f1eee5",
    band: "#d8cfb9",
    core: "#86704e",
    accent: "#ba9052",
  },
  "Medium Firm": {
    sink: 0.1,
    bulge: 0.012,
    topHeight: 0.24,
    top: "#e8eee8",
    band: "#bdcdbf",
    core: "#52705b",
    accent: "#86a57f",
  },
};

function Mattress({ firmness, spin }: { firmness: FirmnessLabel; spin: boolean }) {
  const group = useRef<Group>(null);
  const comfortLayers = useRef<Group>(null);
  const pressureWeight = useRef<Group>(null);
  const presentation = presentations[firmness];

  useFrame(({ clock }, delta) => {
    if (!group.current || !comfortLayers.current || !pressureWeight.current) return;

    if (spin) group.current.rotation.y += delta * 0.2;

    const cycle = spin ? (Math.sin(clock.elapsedTime * 1.7 - Math.PI / 2) + 1) / 2 : 0.72;
    const pressure = cycle * cycle * (3 - 2 * cycle);
    const targetScaleY = 1 - presentation.sink * pressure;
    const targetScaleXZ = 1 + presentation.bulge * pressure;
    const targetLayerY = -presentation.sink * 0.24 * pressure;
    const targetWeightY = 1.72 - (0.62 + presentation.sink * 0.72) * pressure;
    const smoothing = 1 - Math.exp(-delta * 10);

    comfortLayers.current.scale.y += (targetScaleY - comfortLayers.current.scale.y) * smoothing;
    comfortLayers.current.scale.x += (targetScaleXZ - comfortLayers.current.scale.x) * smoothing;
    comfortLayers.current.scale.z += (targetScaleXZ - comfortLayers.current.scale.z) * smoothing;
    comfortLayers.current.position.y += (targetLayerY - comfortLayers.current.position.y) * smoothing;
    pressureWeight.current.position.y += (targetWeightY - pressureWeight.current.position.y) * smoothing;
  });

  return (
    <group ref={group} rotation={[0.08, -0.55, 0]} position={[0, -0.08, 0]} scale={0.92}>
      <RoundedBox args={[4.2, 0.7, 2.85]} radius={0.16} smoothness={6} position={[0, -0.34, 0]} castShadow>
        <meshStandardMaterial color={presentation.core} roughness={0.72} envMapIntensity={0.55} />
      </RoundedBox>

      <group ref={comfortLayers}>
        <RoundedBox args={[4.24, 0.3, 2.89]} radius={0.14} smoothness={6} position={[0, 0.15, 0]} castShadow>
          <meshStandardMaterial color={presentation.band} roughness={0.78} envMapIntensity={0.5} />
        </RoundedBox>

        <RoundedBox
          args={[4.18, presentation.topHeight, 2.83]}
          radius={0.2}
          smoothness={8}
          position={[0, 0.38 + presentation.topHeight * 0.25, 0]}
          castShadow
        >
          <meshStandardMaterial color={presentation.top} roughness={0.86} envMapIntensity={0.4} />
        </RoundedBox>

        <mesh position={[0, 0.34, 1.46]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.09, 0.025, 12, 32]} />
          <meshStandardMaterial color={presentation.accent} roughness={0.65} />
        </mesh>

        {[-1.4, -0.7, 0, 0.7, 1.4].map((x) => (
          <mesh key={x} position={[x, 0.68 + presentation.topHeight * 0.18, 0]} castShadow>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color={presentation.accent} roughness={0.72} />
          </mesh>
        ))}
      </group>

      <group ref={pressureWeight} position={[0, 1.72, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.42, 40, 40]} />
          <meshStandardMaterial color="#3c3040" roughness={0.3} metalness={0.18} envMapIntensity={0.9} />
        </mesh>
        <mesh position={[0, 0.43, 0]} castShadow>
          <torusGeometry args={[0.16, 0.045, 16, 36]} />
          <meshStandardMaterial color="#8f7a96" roughness={0.28} metalness={0.35} />
        </mesh>
      </group>
    </group>
  );
}

export default function FirmnessMattress3D({ firmness }: { firmness: FirmnessLabel }) {
  const reduceMotion = useReducedMotion();
  const [isMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 640px)").matches : false,
  );

  return (
    <Canvas
      className="!absolute inset-0"
      shadows
      camera={{ position: [5.2, 3.1, 5.8], fov: 30 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Environment resolution={128} environmentIntensity={0.82}>
          <Lightformer intensity={2.1} position={[0, 5, -3]} scale={[10, 5, 1]} color="#fff8ef" />
          <Lightformer intensity={1} position={[-5, 2, 3]} scale={[5, 5, 1]} color="#eadced" />
          <Lightformer intensity={0.8} position={[5, 1, 2]} scale={[5, 5, 1]} color="#ffffff" />
        </Environment>
      </Suspense>

      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 7, 4]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#d8c3e6" />

      <Float
        speed={reduceMotion ? 0 : 1}
        rotationIntensity={reduceMotion ? 0 : 0.08}
        floatIntensity={reduceMotion ? 0 : 0.28}
        floatingRange={[-0.03, 0.06]}
      >
        <Mattress firmness={firmness} spin={!reduceMotion} />
      </Float>

      <ContactShadows
        position={[0, -0.95, 0]}
        opacity={0.38}
        scale={8}
        blur={2.6}
        far={4}
        resolution={isMobile ? 512 : 1024}
        color="#2c1a33"
      />
    </Canvas>
  );
}