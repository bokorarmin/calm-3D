import { useMemo } from "react";

export interface Vegetation {
  type: "pine" | "oak" | "bush";
  x: number;
  z: number;
  height?: number;
  radius?: number;
  size?: number;
}

export const Trees = () => {
  const vegetation = useMemo(() => {
    const data: Vegetation[] = [];

    // Pine trees
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 50 + 15;
      data.push({
        type: "pine",
        x: Math.cos(angle) * distance,
        z: Math.sin(angle) * distance,
        height: Math.random() * 5 + 10,
        radius: Math.random() * 0.2 + 0.3,
      });
    }

    // Oak-like trees
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 50 + 15;
      data.push({
        type: "oak",
        x: Math.cos(angle) * distance,
        z: Math.sin(angle) * distance,
        height: Math.random() * 4 + 8,
        radius: Math.random() * 0.25 + 0.35,
      });
    }

    // Bushes
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 60 + 10;
      data.push({
        type: "bush",
        x: Math.cos(angle) * distance,
        z: Math.sin(angle) * distance,
        size: Math.random() * 0.5 + 0.8,
      });
    }

    return data;
  }, []);

  return (
    <>
      {vegetation.map((item, i) => {
        if (item.type === "pine" && item.height && item.radius) {
          return (
            <group key={i} position={[item.x, 0, item.z]}>
              <mesh position={[0, item.height / 2, 0]} castShadow>
                <cylinderGeometry
                  args={[item.radius, item.radius + 0.1, item.height, 8]}
                />
                <meshStandardMaterial color="#1a1410" roughness={0.95} />
              </mesh>
              <mesh position={[0, item.height + 1.5, 0]} castShadow>
                <coneGeometry
                  args={[item.height * 0.25, item.height * 0.4, 8]}
                />
                <meshStandardMaterial color="#0d1a0d" roughness={0.85} />
              </mesh>
              <mesh position={[0, item.height + 2.5, 0]} castShadow>
                <coneGeometry
                  args={[item.height * 0.2, item.height * 0.35, 8]}
                />
                <meshStandardMaterial color="#0f1c0f" roughness={0.85} />
              </mesh>
            </group>
          );
        } else if (item.type === "oak" && item.height && item.radius) {
          return (
            <group key={i} position={[item.x, 0, item.z]}>
              <mesh position={[0, item.height / 2, 0]} castShadow>
                <cylinderGeometry
                  args={[item.radius, item.radius + 0.15, item.height, 8]}
                />
                <meshStandardMaterial color="#1a1410" roughness={0.95} />
              </mesh>
              <mesh position={[0, item.height + 1, 0]} castShadow>
                <sphereGeometry args={[item.height * 0.35, 8, 8]} />
                <meshStandardMaterial color="#0f1a0a" roughness={0.85} />
              </mesh>
              <mesh
                position={[item.height * 0.15, item.height + 1.2, 0]}
                castShadow
              >
                <sphereGeometry args={[item.height * 0.25, 8, 8]} />
                <meshStandardMaterial color="#0f1a0a" roughness={0.85} />
              </mesh>
              <mesh
                position={[-item.height * 0.15, item.height + 1.2, 0]}
                castShadow
              >
                <sphereGeometry args={[item.height * 0.25, 8, 8]} />
                <meshStandardMaterial color="#0f1a0a" roughness={0.85} />
              </mesh>
            </group>
          );
        } else if (item.type === "bush" && item.size) {
          return (
            <mesh key={i} position={[item.x, item.size / 2, item.z]} castShadow>
              <sphereGeometry args={[item.size, 8, 8]} />
              <meshStandardMaterial color="#0a1505" roughness={0.9} />
            </mesh>
          );
        }
        return null;
      })}
    </>
  );
};
