import { useMemo } from "react";
export interface Building {
  type: string;
  x: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  color: string;
}

export const CityBuildings = () => {
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

        if (type < 0.3) {
          // Skyscraper
          building = {
            type: "skyscraper",
            x: x * spacing + (Math.random() - 0.5) * 5,
            z: z * spacing + (Math.random() - 0.5) * 5,
            width: Math.random() * 4 + 6,
            height: Math.random() * 35 + 30,
            depth: Math.random() * 4 + 6,
            color: "#151515",
          };
        } else if (type < 0.6) {
          // Medium building
          building = {
            type: "medium",
            x: x * spacing + (Math.random() - 0.5) * 5,
            z: z * spacing + (Math.random() - 0.5) * 5,
            width: Math.random() * 5 + 8,
            height: Math.random() * 15 + 15,
            depth: Math.random() * 5 + 8,
            color: "#1a1a1a",
          };
        } else {
          // Low building / shop
          building = {
            type: "low",
            x: x * spacing + (Math.random() - 0.5) * 5,
            z: z * spacing + (Math.random() - 0.5) * 5,
            width: Math.random() * 6 + 7,
            height: Math.random() * 5 + 8,
            depth: Math.random() * 6 + 7,
            color: "#222222",
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
        <mesh
          key={i}
          position={[building.x, building.height / 2, building.z]}
          castShadow
          receiveShadow
        >
          <boxGeometry
            args={[building.width, building.height, building.depth]}
          />
          <meshStandardMaterial
            color={building.color}
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>
      ))}
    </>
  );
};
