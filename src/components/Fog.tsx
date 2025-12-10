import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export const Fog = () => {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.FogExp2("#151515", 0.015);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return null;
};
