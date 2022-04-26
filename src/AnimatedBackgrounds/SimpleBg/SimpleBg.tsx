import { memo, useCallback } from "react";
import { useMouse } from "src/Contexts/MouseProvider";
import { GetStyle, GridPassedProps } from "src/Grid/Containers/types";
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
// eslint-disable-next-line react/prop-types
const CellContent: GridPassedProps["CellContent"] = ({ style }) => (
  <PatternCell cellStyle={style} />
);
const SimpleAnimatedBg = ({ cellSize = 100, ...passProps }: Props) => {
  const { width, height } = passProps;
  const timeNow = useIntervalState(getDate, 1000, Date.now());
  const { clientX, clientY } = useMouse();

  const getContentStyle = useCallback<GetStyle>(
    ({ gridX, gridY }) => {
      const noise =
        Math.min(1, perlin(gridX, gridY, timeNow / 5000) * 1.03) ** 8;
      const opacity = noise;
      return { opacity };
    },
    [timeNow]
  );
  const getCellStyle = useCallback<GetStyle>(
    ({ gridX, gridY, middleX, middleY, countY, countX }) => {
      const opacity = Math.pow(
        (Math.abs((countX - 1) / 2 - gridX) / (width / height) +
          Math.abs((countY - 1) / 2 - gridY) / (height / width)) /
          8,
        4
      );
      const distanceFromMouse = Math.sqrt(
        Math.pow(clientX - middleX, 2) + Math.pow(clientY - middleY, 2)
      );
      const scale = Math.max(
        0.5,
        Math.pow(Math.min(1, distanceFromMouse / 150), 2)
      );
      const transform = `scale(${scale})`;
      return { opacity, transform };
    },
    [clientX, clientY, height, width]
  );

  return (
    <Grid
      CellContent={CellContent}
      getContentStyle={getContentStyle}
      getCellStyle={getCellStyle}
      cellClass={classes.Cell}
      gridClass={classes.Grid}
      cellSize={cellSize}
      {...passProps}
    />
  );
};

export default memo(SimpleAnimatedBg);
