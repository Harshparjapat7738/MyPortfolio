"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { DEFAULT_PARTICLE_COLOR } from "@/hooks/useParticleColor";

// Adapted from a supplied reference snippet (originally a full-viewport demo
// scene with unrelated placeholder content). Kept the actual swarm math —
// particles spiral inward from a scattered shell toward a glowing core,
// wobbling less as they approach it — dropped the demo-specific strings and
// no-op control/annotation stubs it came with, since nothing here reads them.
//
// Color is a single flat, user-adjustable material color (see
// useParticleColor) rather than the original's per-instance HSL gradient.
// Two reasons: an InstancedMesh's per-instance `instanceColor` buffer has to
// exist *before* the material's first compile for the color to actually
// render at all (created it too late once already and every particle
// rendered flat black — invisible against a dark background, barely visible
// against a light one), and a single color is also what makes "let the user
// pick a color" a coherent feature instead of "let the user pick a gradient".
// Brightness now varies by scale instead (particles grow slightly as they
// near the core) so there's still a sense of depth without touching
// per-instance color again.
//
// Particle count is intentionally far below what a standalone WebGL demo
// would use: this animates via a per-particle CPU loop (trig + a lerp) each
// frame, not a GPU shader, and it has to share the frame budget with a real
// page instead of being the only thing on screen.
const PARTICLE_COUNT = 2400;

const SWARM = {
  speed: 0.4,
  chaos: 20,
  coreSize: 10,
};

function ParticleSwarm({ color }: { color: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);

  // Math.random() is inherently impure, so this can't live in useMemo (React
  // may discard and recompute memo values); a useState lazy initializer is
  // guaranteed to run exactly once and is the correct place for one-time
  // non-deterministic setup like a random initial scatter.
  const [positions] = useState<THREE.Vector3[]>(() => {
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos.push(
        new THREE.Vector3((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100)
      );
    }
    return pos;
  });

  const material = useMemo(() => new THREE.MeshBasicMaterial({ toneMapped: false }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  // A plain material.color.set() — no instancing color buffer involved — is
  // the reliable part; this is what actually lets the color picker work.
  useEffect(() => {
    material.color.set(color);
  }, [material, color]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = state.clock.getElapsedTime();
    const { speed, chaos, coreSize } = SWARM;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Progression toward the core: 0 = outer shell, 1 = core.
      const norm = i / PARTICLE_COUNT;
      const progress = (norm + time * speed * 0.2) % 1.0;
      const easeProgress = Math.pow(progress, 1.5);

      // Fibonacci-sphere distribution for an even 3D shell.
      const goldenRatio = (1.0 + Math.sqrt(5.0)) / 2.0;
      const theta = (2.0 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1.0 - 2.0 * norm);

      const currentRadius = coreSize + 150.0 * (1.0 - easeProgress);

      // Wobble is strongest at the outer edge, settles to ~0 at the core.
      const instability = Math.pow(1.0 - progress, 2.0);
      const wobbleX = Math.sin(time * 2.0 + norm * 100.0) * chaos * instability;
      const wobbleY = Math.cos(time * 1.5 + norm * 200.0) * chaos * instability;
      const wobbleZ = Math.sin(time * 3.0 - norm * 300.0) * chaos * instability;

      const sinPhi = Math.sin(phi);
      const x = currentRadius * sinPhi * Math.cos(theta) + wobbleX;
      const y = currentRadius * sinPhi * Math.sin(theta) + wobbleY;
      const z = currentRadius * Math.cos(phi) + wobbleZ;

      target.set(x, y, z);
      positions[i].lerp(target, 0.1);
      dummy.position.copy(positions[i]);

      // Stand-in for the old per-instance brightness gradient: particles
      // swell slightly as they approach the core, and pulse right as they
      // arrive, so there's still a sense of "brighter near the center"
      // without needing a second (unreliable) instancing buffer.
      const corePulse = progress > 0.95 ? Math.abs(Math.sin(time * 10.0)) * 0.25 : 0;
      dummy.scale.setScalar(0.5 + 0.55 * progress + corePulse);

      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, PARTICLE_COUNT]} />;
}

export default function HeroParticles({ color = DEFAULT_PARTICLE_COLOR }: { color?: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 100], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: "none" }}
    >
      <ParticleSwarm color={color} />
      {/* Ambient auto-rotate only — manual drag/zoom/pan are disabled so this
          background never steals pointer events meant for the hero's real
          buttons and text sitting on top of it. */}
      <OrbitControls autoRotate autoRotateSpeed={0.6} enableRotate={false} enableZoom={false} enablePan={false} />
      <EffectComposer>
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.15} luminanceSmoothing={0.3} />
      </EffectComposer>
    </Canvas>
  );
}
