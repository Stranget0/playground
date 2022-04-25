import classNames from "classnames";
import { useMemo } from "react";
import classes from "../Grid.module.scss";
import mergeStyles from "../utils/mergeStyles";
import useComputeStyle from "../utils/useComputeStyle";
import useElementRect from "../utils/useElementRect";
import { CellFArgs, PassedProps } from "./types";

interface Props extends PassedProps, Pick<CellFArgs, "countY" | "countX"> {
  x: number;
  y: number;
  gap: number;
  hasNext: boolean;
}

const Cell = ({
  cellSize,
  countX,
  countY,
  x,
  y,
  gap,
  hasNext,
  cellClass,
  CellContent,
  getCellStyle,
  getSecondaryStyle,
}: Props) => {
  const { rect, ref: cellRef } = useElementRect();
  const passData = useMemo(
    () => ({ ...rect, gridX: x, gridY: y, countX, countY, cellRef }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countX, countY, rect, x, y]
  );
  const computedStyle = useComputeStyle(getCellStyle, passData);
  const secondaryStyle = useComputeStyle(getSecondaryStyle, passData);

  const gapStyle = {
    marginRight: hasNext ? gap : undefined,
    width: cellSize,
    height: cellSize,
  };

  const cellStyle = mergeStyles(gapStyle, computedStyle, secondaryStyle);
  return (
    <div
      className={classNames(classes.Cell, cellClass)}
      style={cellStyle}
      ref={cellRef}
    >
      {CellContent && <CellContent {...passData} />}
    </div>
  );
};

export type CellProps = Props;
export default Cell;
