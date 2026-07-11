'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT   = 55;
const THRESH2 = 3.6 * 3.6;
const MAX_SEGS = COUNT * COUNT; // over-allocated max line segments

const staticPositions = new Float32Array(COUNT * 3);
const staticVelocities = new Float32Array(COUNT * 3);
const staticLineBuffer = new Float32Array(MAX_SEGS * 6);

for (let i = 0; i < COUNT; i++) {
  staticPositions[i * 3]      = (Math.random() - 0.5) * 24;
  staticPositions[i * 3 + 1]  = (Math.random() - 0.5) * 14;
  staticPositions[i * 3 + 2]  = (Math.random() - 0.5) * 2;
  staticVelocities[i * 3]     = (Math.random() - 0.5) * 0.006;
  staticVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
}

function Constellation() {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef  = useRef<THREE.LineSegments>(null!);
  const velocitiesRef = useRef<Float32Array>(staticVelocities);

  useFrame(() => {
    const pos = pointsRef.current?.geometry.attributes.position.array as Float32Array;
    const velocities = velocitiesRef.current;
    if (!pos || !velocities) return;

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      if (Math.abs(pos[i * 3])     > 12) velocities[i * 3]     *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 7)  velocities[i * 3 + 1] *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const la = linesRef.current?.geometry.attributes.position;
    if (la) {
      const lineBuffer = la.array as Float32Array;
      let lc = 0;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          if (dx * dx + dy * dy < THRESH2) {
            const b = lc * 6;
            lineBuffer[b]     = pos[i * 3];     lineBuffer[b + 1] = pos[i * 3 + 1]; lineBuffer[b + 2] = pos[i * 3 + 2];
            lineBuffer[b + 3] = pos[j * 3];     lineBuffer[b + 4] = pos[j * 3 + 1]; lineBuffer[b + 5] = pos[j * 3 + 2];
            lc++;
          }
        }
      }
      la.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lc * 2);
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[staticPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="white" size={0.055} transparent opacity={0.16} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[staticLineBuffer, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="white" transparent opacity={0.045} />
      </lineSegments>
    </>
  );
}

export function ContactCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1]}
    >
      <Constellation />
    </Canvas>
  );
}
