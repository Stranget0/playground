import { useMemo, ReactElement } from "react";
import CellProvider, { CellContextState } from "./contexts/CellContentProvider";
import getAxisElementCount from "./utils/getAxisElementCount";
import Row from "./Containers/Row";
import classes from "./Grid.module.scss";

interface Props extends CellContextState {
  cellSize: number;
  width: number;
  height: number;
  gap?: number;
}

const Grid = ({
  cellSize,
  height,
  width,
  gap = 0,
  CellContent,
  setCellStyle,
  cellClass,
}: Props) => {
  const countX = getAxisElementCount(cellSize, width, gap);
  const countY = getAxisElementCount(cellSize, height, gap);

  const rows = useMemo(() => {
    const _rows: ReactElement[] = [];
    for (let y = 0; y < countY; y++) {
      _rows.push(
        <Row
          key={y}
          y={y}
          countX={countX}
          gap={gap}
          hasNext={y !== countY - 1}
        />
      );
    }
    return _rows;
  }, [countY, countX, gap]);

  return (
    <div className={classes.Grid} style={{ width, height }}>
      <CellProvider
        cellClass={cellClass}
        setCellStyle={setCellStyle}
        CellContent={CellContent}
      >
        {rows}
      </CellProvider>
    </div>
  );
};

export type GridProps = Props;
export default Grid;
