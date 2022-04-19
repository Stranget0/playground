import { ReactElement, useMemo } from "react";
import Cell from "./Cell";
import classes from "../Grid.module.scss";

interface Props {
  y: number;
  countX: number;
  countY: number;
  gap: number;
  hasNext: boolean;
  updateDelaySpread: number;
}

const Row = ({ y, countX, countY, gap, hasNext, updateDelaySpread }: Props) => {
  const rowStyle = { marginBottom: hasNext ? gap : undefined };

  const updateDelay = updateDelaySpread * Math.abs(countY / 2 - y);

  const cells = useMemo(() => {
    const _cells: ReactElement[] = [];
    for (let x = 0; x < countX; x++) {
      _cells.push(
        <Cell
          key={x + x * y}
          x={x}
          y={y}
          hasNext={x !== countX - 1}
          gap={gap}
          updateDelay={
            updateDelay
          }
        />
      );
    }
    return _cells;
  }, [countX]);

  return (
    <div className={classes.Row} style={rowStyle}>
      {cells}
    </div>
  );
};

export default Row;
