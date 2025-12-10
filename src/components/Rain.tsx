import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface RainProps {
  intensity?: number;
  onDropHit: (x: number, z: number) => void;
}

export const Rain = ({ intensity = 160, onDropHit }: RainProps) => {
  const rainRef = useRef<THREE.LineSegments>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(intensity * 3);
    const velocities = new Float32Array(intensity);

    for (let i = 0; i < intensity; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = Math.random() * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      velocities[i] = Math.random() * 0.2 + 0.4;
    }

    return { positions, velocities };
  }, [intensity]);

  const rainGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(intensity * 6);

    for (let i = 0; i < intensity; i++) {
      const x = particles.positions[i * 3];
      const y = particles.positions[i * 3 + 1];
      const z = particles.positions[i * 3 + 2];

      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y - 0.5;
      positions[i * 6 + 5] = z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [intensity, particles.positions]);

  useFrame(() => {
    if (!rainRef.current) return;

    const positions = rainRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < intensity; i++) {
      positions[i * 6 + 1] -= particles.velocities[i];
      positions[i * 6 + 4] -= particles.velocities[i];

      if (positions[i * 6 + 1] < 0.1) {
        const x = positions[i * 6];
        const z = positions[i * 6 + 2];
        onDropHit(x, z);

        positions[i * 6 + 1] = 40;
        positions[i * 6 + 4] = 39.5;
      }
    }

    rainRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={rainRef} geometry={rainGeometry}>
      <lineBasicMaterial color="#ffffffff" transparent opacity={0.7} />
    </lineSegments>
  );
};
