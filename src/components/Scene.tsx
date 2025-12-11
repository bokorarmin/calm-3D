import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

import { CityBuildings } from "../sorroundings/city/CityBuildings";
import { Trees } from "../sorroundings/forest/Trees";

import { Fog } from "./Fog";
import { Ground } from "./Ground";
import { Lights } from "./Lights";
import { Puddles } from "./Puddles";
import { Rain } from "./Rain";

export interface Puddle {
  id: number;
  x: number;
  z: number;
  opacity: number;
  createdAt: number;
}

interface SceneProps {
  environment: "city" | "forest" | null;
}

export const Scene = ({ environment }: SceneProps) => {
  const [puddles, setPuddles] = useState<Puddle[]>([]);
  const puddleIdRef = useRef<number>(0);
  const [lightningIntensity, setLightningIntensity] = useState<number>(0);
  const lastLightningRef = useRef<number>(0);

  const handleDropHit = (x: number, z: number) => {
    const newPuddle: Puddle = {
      id: puddleIdRef.current++,
      x,
      z,
      opacity: 1,
      createdAt: Date.now(),
    };

    setPuddles((prev) => [...prev, newPuddle]);
  };

  useFrame(() => {
    const now = Date.now();

    setPuddles((prev) =>
      prev
        .map((p) => ({
          ...p,
          opacity: Math.max(0, 1 - (now - p.createdAt) / 600),
        }))
        .filter((p) => p.opacity > 0),
    );

    if (lightningIntensity > 0) {
      setLightningIntensity((prev) => Math.max(0, prev - 0.05));
    } else if (now - lastLightningRef.current > 5000 && Math.random() < 0.01) {
      setLightningIntensity(1);
      lastLightningRef.current = now;
    }
  });

  return (
    <>
      {/* <NightSky /> */}
      <Fog />
      <Lights lightningIntensity={lightningIntensity} />
      <Rain intensity={300} onDropHit={handleDropHit} />
      <Puddles puddles={puddles} />
      <Ground />
      {environment === "city" && <CityBuildings />}
      {environment === "forest" && <Trees />}
    </>
  );
};
