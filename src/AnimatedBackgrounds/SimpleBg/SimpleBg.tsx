import { memo, useCallback } from "react";
import { useMouse } from "src/Contexts/MouseProvider";
import { GetStyle } from "src/Grid/Containers/types";
import Grid, { GridProps } from "src/Grid/Grid";
import useIntervalState from "src/Grid/utils/useUpdate";
import PatternCell from "../Cells/Pattern/Pattern";
import classes from "./SimpleBg.module.scss";
import { noise as perlin } from "@chriscourses/perlin-noise";

type PassProps = Pick<GridProps, "cellSize" | "width" | "height" | "gap">;

interface Props extends Partial<PassProps> {
  rerenderMs?: number;
  width: number;
  height: number;
}
const getDate = () => Date.now();
const SimpleAnimatedBg = ({ cellSize = 100, ...passProps }: Props) => {
  const { width, height } = passProps;
  const timeNow = useIntervalState(getDate, 1000, Date.now());

  const getCellStyle = useCallback<GetStyle>(
    ({ gridX, gridY, countX, countY }) => {
      const noise =
        Math.min(1, perlin(gridX, gridY, timeNow / 5000) * 1.03) ** 8;
      const opacity = noise;
      return { opacity };
    },
    [timeNow]
  );
  const getCellStyleInternal = useCallback<GetStyle>(
    ({ gridX, gridY, countY, countX }) => {
      const opacity = Math.pow(
        (Math.abs((countX - 1) / 2 - gridX) / (width / height) +
          Math.abs((countY - 1) / 2 - gridY) / (height / width)) /
          8,
        4
      );
      return { opacity };
    },
    [height, width]
  );

  // const getSecondaryStyle = useCallback<GetStyle>(
  //   ({ middleX,  middleY }) => {
  //     const distance = Math.sqrt((middleX - clientX) ** 2 + (middleY - clientY) ** 2);
  //     const scale = Math.max(0.2, Math.min(1, distance / 300));
  //     const transform = `scale(${scale})`;
  //     return { transform };
  //   },
  //   [clientX, clientY]
  // );
  // const { width, height } = passProps;
  // const rotationX = (clientY / height) * 20;
  // const rotationY = (-clientX / width) * 20 + 30;
  return (
    <Grid
      CellContent={(args) => (
        <PatternCell
          cellStyle={getCellStyle(args)}
          patternStyle={{ opacity: 0.2 }}
        />
      )}
      cellClass={classes.Cell}
      getCellStyle={getCellStyleInternal}
      gridClass={classes.Grid}
      // gridStyle={{
      //   transform: `translate(7%, -30%) rotateX(${rotationX}deg) rotateY(${rotationY}deg) translateZ(-1600px)`,
      // }}
      // getSecondaryStyle={getSecondaryStyle}
      cellSize={cellSize}
      {...passProps}
    />
  );
};

export default memo(SimpleAnimatedBg);
