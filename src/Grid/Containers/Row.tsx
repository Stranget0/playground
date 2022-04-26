import { memo, ReactElement } from "react";
import Cell from "./Cell";
import classes from "../Grid.module.scss";
import { GridPassedProps } from "./types";

interface Props extends GridPassedProps {
  y: number;
  countX: number;
  countY: number;
  gap: number;
  hasNext: boolean;
}

const Row = ({ y, countX, countY, gap, hasNext,CellContent, ...cellProps }: Props) => {
  const rowStyle = { marginBottom: hasNext ? gap : undefined };

  const cells: ReactElement[] = [];
  for (let x = 0; x < countX; x++) {
    cells.push(
      <Cell
        key={x + (x + 1) * y}
        x={x}
        y={y}
        hasNext={x !== countX - 1}
        gap={gap}
        countX={countX}
        countY={countY}
				CellContent={CellContent}
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

export default memo(Row);
