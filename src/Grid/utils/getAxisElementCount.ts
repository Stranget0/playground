export default function getAxisElementCount(
  cellSize: number,
  innerSize: number,
  gap: number
) {
  const countAxis = innerSize / cellSize;
  const gapAreaAxis = (countAxis - 1) * gap;
  const gapIncluded = Math.ceil((innerSize - gapAreaAxis) / cellSize);
  return gapIncluded;
}
