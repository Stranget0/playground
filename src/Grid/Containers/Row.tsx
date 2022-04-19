import { ReactElement, useMemo } from "react";
import Cell from "./Cell";
import classes from "../Grid.module.scss";

interface Props {
  y: number;
  countX: number;
  gap: number;
  hasNext: boolean;
}

const Row = ({ y, countX, gap, hasNext }: Props) => {
  const rowStyle = { marginBottom: hasNext ? gap : undefined };
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
