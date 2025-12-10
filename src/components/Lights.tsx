interface LightsProps {
  lightningIntensity: number;
}

export const Lights = ({ lightningIntensity }: LightsProps) => {
  return (
    <>
      <ambientLight
        intensity={0.12 + lightningIntensity * 0.8}
        color="#9ca3af"
      />
      <directionalLight
        position={[20, 40, 20]}
        intensity={0.25 + lightningIntensity * 1.5}
        color={lightningIntensity > 0 ? "#e0e7ff" : "#6b7280"}
        castShadow
      />
      <hemisphereLight
        color="#374151"
        groundColor="#111827"
        intensity={0.15 + lightningIntensity * 0.5}
      />
    </>
  );
};
