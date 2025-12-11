export const generateWindows = (
  width: number,
  height: number,
  depth: number,
  lightProbability: number,
): Array<{ x: number; y: number; z: number; color: string }> => {
  const windows: Array<{ x: number; y: number; z: number; color: string }> = [];
  const windowSpacingY = 3.5;
  const windowSpacingX = 2.5;
  const floors = Math.floor(height / windowSpacingY);
  const windowsPerRow = Math.floor(width / windowSpacingX);

  // Front and back faces - only place windows randomly
  for (let floor = 0; floor < floors; floor++) {
    for (let col = 0; col < windowsPerRow; col++) {
      const y = -height / 2 + floor * windowSpacingY + 1.5;
      const x = -width / 2 + col * windowSpacingX + windowSpacingX / 2;

      // Front face - reduced probability
      if (Math.random() < lightProbability * 0.3) {
        windows.push({
          x,
          y,
          z: depth / 2 + 0.01,
          color: Math.random() < 0.7 ? "#ffdd88" : "#ffffff",
        });
      }

      // Back face - reduced probability
      if (Math.random() < lightProbability * 0.25) {
        windows.push({
          x,
          y,
          z: -depth / 2 - 0.01,
          color: Math.random() < 0.7 ? "#ffdd88" : "#ffffff",
        });
      }
    }
  }

  // Left and right faces - fewer windows
  const windowsPerDepth = Math.floor(depth / windowSpacingX);
  for (let floor = 0; floor < floors; floor++) {
    for (let col = 0; col < windowsPerDepth; col++) {
      const y = -height / 2 + floor * windowSpacingY + 1.5;
      const z = -depth / 2 + col * windowSpacingX + windowSpacingX / 2;

      // Right face - reduced probability
      if (Math.random() < lightProbability * 0.25) {
        windows.push({
          x: width / 2 + 0.01,
          y,
          z,
          color: Math.random() < 0.7 ? "#ffdd88" : "#ffffff",
        });
      }

      // Left face - reduced probability
      if (Math.random() < lightProbability * 0.25) {
        windows.push({
          x: -width / 2 - 0.01,
          y,
          z,
          color: Math.random() < 0.7 ? "#ffdd88" : "#ffffff",
        });
      }
    }
  }

  return windows;
};
