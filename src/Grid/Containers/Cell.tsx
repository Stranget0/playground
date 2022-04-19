import classNames from "classnames";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { useCell } from "../contexts/CellContentProvider";
import classes from "../Grid.module.scss";

interface Props {
  x: number;
  y: number;
  gap: number;
  hasNext: boolean;
}

const Cell = ({ x, y, hasNext, gap }: Props) => {
  const [position, setPosition] = useState({ posX: 0, posY: 0 });
  const cellRef = useRef<HTMLDivElement>(null);
  const passData = { ...position, x, y, cellRef };

  const { getCellStyle, CellContent, cellClass } = useCell();

  const [computedStyle, setComputedStyle] = useState(getCellStyle?.(passData));

  useEffect(() => {
    if (cellRef.current) {
      const { x: posX, y: posY } = cellRef.current.getBoundingClientRect();
      setPosition({ posX, posY });
    }
  }, []);

  useEffect(() => {
    const frameId = requestAnimationFrame(() =>
      setComputedStyle(getCellStyle?.(passData))
    );
    return () => cancelAnimationFrame(frameId);
  }, [getCellStyle]);

  const resultJSX = useMemo(() => {
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
        {CellContent && <CellContent {...passData} />}
      </div>
    );
  }, [computedStyle, cellClass, CellContent]);

  return resultJSX;
};

export type CellProps = Props;
export default Cell;
