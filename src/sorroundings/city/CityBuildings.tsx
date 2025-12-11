import { useMemo } from "react";
import * as THREE from "three";

import { generateWindows } from "./generateWindows";

export interface Building {
  type: string;
  x: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  color: string;
  windows?: Array<{ x: number; y: number; z: number; color: string }>;
}

export const CityBuildings = () => {
  const buildingColor = "#1a1a1a";
  const buildings = useMemo(() => {
    const buildingData: Building[] = [];
    const grid = 6;
    const spacing = 22;

    for (let x = -grid; x <= grid; x++) {
      for (let z = -grid; z <= grid; z++) {
        if (Math.abs(x) < 2 && Math.abs(z) < 2) continue;
        if (Math.random() > 0.65) continue;

        const type = Math.random();
        let building: Building;

        if (type < 0.15) {
          // Modern glass skyscraper
          const width = Math.random() * 4 + 7;
          const height = Math.random() * 40 + 35;
          const depth = Math.random() * 4 + 7;
          building = {
            type: "glass-skyscraper",
            x: x * spacing + (Math.random() - 0.5) * 5,
            z: z * spacing + (Math.random() - 0.5) * 5,
            width,
            height,
            depth,
            color: buildingColor,
            windows: generateWindows(width, height, depth, 0.9),
          };
        } else if (type < 0.3) {
          // Traditional skyscraper
          const width = Math.random() * 4 + 6;
          const height = Math.random() * 35 + 30;
          const depth = Math.random() * 4 + 6;
          building = {
            type: "skyscraper",
            x: x * spacing + (Math.random() - 0.5) * 5,
            z: z * spacing + (Math.random() - 0.5) * 5,
            width,
            height,
            depth,
            color: buildingColor,
            windows: generateWindows(width, height, depth, 0.7),
          };
        } else if (type < 0.45) {
          // Office building
          const width = Math.random() * 5 + 9;
          const height = Math.random() * 18 + 18;
          const depth = Math.random() * 5 + 9;
          building = {
            type: "office",
            x: x * spacing + (Math.random() - 0.5) * 5,
            z: z * spacing + (Math.random() - 0.5) * 5,
            width,
            height,
            depth,
            color: buildingColor,
            windows: generateWindows(width, height, depth, 0.8),
          };
        } else if (type < 0.6) {
          // Medium residential
          const width = Math.random() * 5 + 8;
          const height = Math.random() * 15 + 15;
          const depth = Math.random() * 5 + 8;
          building = {
            type: "residential",
            x: x * spacing + (Math.random() - 0.5) * 5,
            z: z * spacing + (Math.random() - 0.5) * 5,
            width,
            height,
            depth,
            color: buildingColor,
            windows: generateWindows(width, height, depth, 0.6),
          };
        } else if (type < 0.75) {
          // Low commercial building
          const width = Math.random() * 6 + 7;
          const height = Math.random() * 5 + 8;
          const depth = Math.random() * 6 + 7;
          building = {
            type: "commercial",
            x: x * spacing + (Math.random() - 0.5) * 5,
            z: z * spacing + (Math.random() - 0.5) * 5,
            width,
            height,
            depth,
            color: buildingColor,
            windows: generateWindows(width, height, depth, 0.5),
          };
        } else if (type < 0.85) {
          // Apartment complex
          const width = Math.random() * 6 + 10;
          const height = Math.random() * 12 + 12;
          const depth = Math.random() * 6 + 10;
          building = {
            type: "apartment",
            x: x * spacing + (Math.random() - 0.5) * 5,
            z: z * spacing + (Math.random() - 0.5) * 5,
            width,
            height,
            depth,
            color: buildingColor,
            windows: generateWindows(width, height, depth, 0.75),
          };
        } else {
          // Small shop/retail
          const width = Math.random() * 5 + 6;
          const height = Math.random() * 3 + 5;
          const depth = Math.random() * 5 + 6;
          building = {
            type: "shop",
            x: x * spacing + (Math.random() - 0.5) * 5,
            z: z * spacing + (Math.random() - 0.5) * 5,
            width,
            height,
            depth,
            color: buildingColor,
            windows: generateWindows(width, height, depth, 0.4),
          };
        }

        buildingData.push(building);
      }
    }
    return buildingData;
  }, []);

  return (
    <>
      {buildings.map((building, i) => (
        <group key={i} position={[building.x, building.height / 2, building.z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry
              args={[building.width, building.height, building.depth]}
            />
            <meshStandardMaterial
              color={building.color}
              roughness={0.6}
              metalness={0.2}
            />
          </mesh>

          {/* Window lights */}
          {building.windows?.map((window, j) => (
            <mesh key={j} position={[window.x, window.y, window.z]}>
              <planeGeometry args={[0.3, 0.4]} />
              <meshBasicMaterial color={window.color} side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
      ))}
    </>
  );
};
