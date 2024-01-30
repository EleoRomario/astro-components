export const hexToAlpha = (hex: string, alpha: number) => {
  const hexAlpha = Math.round(alpha * 255).toString(16);
  return hex + hexAlpha;
};
