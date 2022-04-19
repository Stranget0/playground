import { CSSProperties, memo, useEffect, useState } from "react";
import { SetCellParam } from "src/Grid/contexts/CellContentProvider";
import Grid, { GridProps } from "src/Grid/Grid";
import simplex from "src/utils/simplex";
import classes from "./SimpleBg.module.scss";

type PassProps = Pick<
  GridProps,
  | "cellSize"
  | "width"
  | "height"
  | "gap"
  | "CellContent"
  | "cellClass"
  | "updateDelaySpread"
>;

interface Props extends PassProps {
  rerenderMs?: number;
}

const SimpleAnimatedBg = (passProps: Props) => {
  const [, rerender] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => rerender((v) => v + 1), 100);
    return () => clearInterval(intervalId);
  }, []);

  // const [time, setTime] = useState(0);
  // const [setStyleFunc, setStyleFunc] = useState<(p:SetCellParam)=>CSSProperties>(getCellFunc(Date.now()))
  return (
    <Grid
      cellClass={classes.Cell}
      getCellStyle={({ x, y }) => {
        const opacity = simplex.noise3D(x, y, Date.now() / 10000);
        return { opacity };
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
