export interface Puddle {
  id: number;
  x: number;
  z: number;
  opacity: number;
  createdAt: number;
}

export const Puddles = ({ puddles }: { puddles: Puddle[] }) => {
  return (
    <>
      {puddles.map((puddle) => {
        const progress = 1 - puddle.opacity;
        const innerRadius = 0.05 + progress * 0.15;
        const outerRadius = innerRadius + 0.02;

        return (
          <mesh
            key={puddle.id}
            position={[puddle.x, 0.01, puddle.z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[innerRadius, outerRadius, 16]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={puddle.opacity * 0.6}
            />
          </mesh>
        );
      })}
    </>
  );
};
