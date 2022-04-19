import classNames from "classnames";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCell } from "../contexts/CellContentProvider";
import classes from "../Grid.module.scss";

interface Props {
  x: number;
  y: number;
  gap: number;
  hasNext: boolean;
}

const Cell = ({ x, y, hasNext, gap }: Props) => {
  const { setCellStyle, CellContent, cellClass } = useCell();
  // const { cellRef, positionData } = useCellPosition(x, y);
	
  const [position, setPosition] = useState({ posX: 0, posY: 0 });
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cellRef.current) return;
    const { top, left, width, height } =
      cellRef.current.getBoundingClientRect();

    const posX = left + width / 2;
    const posY = top + height / 2;
    setPosition({ posX, posY });
  }, []);

	

  const positionData = { ...position, x, y };

  const computedStyle = useMemo(
    () => setCellStyle?.(positionData),
    [setCellStyle]
  );

  const cellStyle = {
    marginRight: hasNext ? gap : undefined,
    ...computedStyle,
  };

	return (
    <div
      className={classNames(classes.Cell, cellClass)}
      style={cellStyle}
      ref={cellRef}
    >
      {CellContent && <CellContent {...positionData} />}
    </div>
  );
};


export type CellProps = Props;
export default Cell;
