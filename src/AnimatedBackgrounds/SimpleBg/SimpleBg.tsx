import { CSSProperties, memo } from "react";
import { SetCellParam } from "src/Grid/contexts/CellContentProvider";
import Grid, { GridProps } from "src/Grid/Grid";
import simplex from "src/utils/simplex";
import classes from "./SimpleBg.module.scss";

type Props = Pick<GridProps, "cellSize" | "width" | "height" | "gap">;

const SimpleAnimatedBg = (passProps: Props) => {
  return (
    <Grid cellClass={classes.Cell} setCellStyle={setCellStyle} {...passProps} />
  );
};

function setCellStyle({ x, y }: SetCellParam): CSSProperties {
  const noise = simplex.noise2D(x, y);
  const noise2 = simplex.noise2D(x * 2, y*2);
  const opacity = noise;
  const animationDuration = `${20 + noise}s`;
  const animationDelay = `${-noise * 100}s`;
  const transform = `scale(${Math.abs(noise2)})`;

  return { animationDuration, animationDelay, opacity, transform };
}

export default memo(SimpleAnimatedBg);
