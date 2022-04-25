import { ReactElement, useMemo } from "react";
import Cell from "./Cell";
import classes from "../Grid.module.scss";
import { PassedProps } from "./types";

interface Props extends PassedProps {
  y: number;
  countX: number;
  countY: number;
  gap: number;
  hasNext: boolean;
}

const Row = ({ y, countX, countY, gap, hasNext, ...cellProps }: Props) => {
  const rowStyle = { marginBottom: hasNext ? gap : undefined };

    const cells: ReactElement[] = [];
    for (let x = 0; x < countX; x++) {
      cells.push(
        <Cell
          key={x + x * y}
          x={x}
          y={y}
          hasNext={x !== countX - 1}
          gap={gap}
          countX={countX}
          countY={countY}
          {...cellProps}
        />
      );
    }

  return (
    <div className={classes.Row} style={rowStyle}>
      {cells}
    </div>
  );
};

export default Row;
