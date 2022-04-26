import { ReactElement, CSSProperties, memo } from "react";
import classNames from "classnames";
import getAxisElementCount from "./utils/getAxisElementCount";
import Row from "./Containers/Row";
import classes from "./Grid.module.scss";
import { GridPassedProps } from "./Containers/types";

interface Props extends GridPassedProps {
  cellSize: number;
  width: number;
  height: number;
  gap?: number;
  gridStyle?: CSSProperties;
  gridClass?: string;
  extraInternalWidth?: number;
  extraInternalHeight?: number;
}

const Grid = ({
  height,
  width,
  gap = 0,
  gridStyle,
  gridClass,
  extraInternalWidth = 0,
  extraInternalHeight = 0,
  CellContent,
  ...cellProps
}: Props) => {
  const { cellSize } = cellProps;
  const countX = getAxisElementCount(cellSize, width + extraInternalWidth, gap);
  const countY = getAxisElementCount(
    cellSize,
    height + extraInternalHeight,
    gap
  );

  const rows: ReactElement[] = [];
  for (let y = 0; y < countY; y++) {
    rows.push(
      <Row
        key={y}
        y={y}
        countX={countX}
        countY={countY}
        gap={gap}
        hasNext={y !== countY - 1}
        CellContent={CellContent}
        {...cellProps}
      />
    );
  }

  return (
    <div className={classes.GridContainer} style={{ width, height }}>
      <div
        className={classNames(classes.Grid, gridClass)}
        style={{
          width: width + extraInternalWidth,
          height: height + extraInternalHeight,
          ...gridStyle,
        }}
      >
        {rows}
      </div>
    </div>
  );
};

export type GridProps = Props;
export default memo(Grid);
