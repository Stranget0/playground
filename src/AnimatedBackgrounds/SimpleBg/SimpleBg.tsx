import { CSSProperties, memo, useEffect, useState } from "react";
import { useMouse } from "src/Contexts/MouseProvider";
import { SetCellParam } from "src/Grid/contexts/CellContentProvider";
import Grid, { GridProps } from "src/Grid/Grid";
import simplex from "src/utils/simplex";
import classes from "./SimpleBg.module.scss";

type PassProps = Pick<
  GridProps,
  "cellSize" | "width" | "height" | "gap" | "CellContent" | "cellClass"
>;

interface Props extends PassProps {
  rerenderMs?: number;
}

const SimpleAnimatedBg = (passProps: Props) => {
  const [, rerender] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => rerender((v) => v + 1), 250);
    return () => clearInterval(intervalId);
  }, []);

  const { clientX, clientY } = useMouse();

  return (
    <Grid
      cellClass={classes.Cell}
      getCellStyle={({ x, y, posX, posY }) => {
        const distance = Math.sqrt(
          (posX - clientX) ** 2 + (posY - clientY) ** 2
        );
        const opacity = simplex.noise3D(x, y, Date.now() / 10000);
        const scale = Math.max(0.02, Math.min(1, distance / 100));
        const transform = `scale(${scale})`;
        return { opacity, transform };
      }}
      {...passProps}
    />
  );
};

function getCellStyle({ x, y }: SetCellParam): CSSProperties {
  const opacity = simplex.noise3D(x, y, Date.now() / 10000);
  return { opacity };
}

export default memo(SimpleAnimatedBg);
