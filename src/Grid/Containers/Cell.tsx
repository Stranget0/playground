import classNames from "classnames";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { useCell } from "../contexts/CellContentProvider";
import classes from "../Grid.module.scss";

interface Props {
  x: number;
  y: number;
  gap: number;
  hasNext: boolean;
  updateDelay: number;
}

const Cell = ({ x, y, hasNext, gap, updateDelay }: Props) => {
  const [position, setPosition] = useState({ posX: 0, posY: 0 });
  const cellRef = useRef<HTMLDivElement>(null);
  const { getCellStyle, CellContent, cellClass } = useCell();

  const positionData = { ...position, x, y };

  const [computedStyle, setComputedStyle] = useState(
    getCellStyle?.(positionData)
  );

  useEffect(() => {
    requestAnimationFrame(() => setComputedStyle(getCellStyle?.(positionData)));
  }, [getCellStyle]);
  // useEffect(() => {
  //   if (!cellRef.current) return;
  //   const { top, left, width, height } =
  //     cellRef.current.getBoundingClientRect();

  //   const posX = left + width / 2;
  //   const posY = top + height / 2;
  //   setPosition({ posX, posY });
  // }, []);

  // useEffect(() => {
  //   if (!getCellStyle) return;
  //   let frameId = 0;
  //   const timeoutId = setTimeout(() => {
  //     frameId = requestAnimationFrame(() =>
  //       setComputedStyle(getCellStyle(positionData))
  //     );
  //   }, updateDelay);
  //   return () => {
  //     cancelAnimationFrame(frameId);
  //     clearTimeout(timeoutId);
  //     setComputedStyle(getCellStyle(positionData));
  //   };
  // }, [getCellStyle]);

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
        {CellContent && <CellContent {...positionData} />}
      </div>
    );
  }, [computedStyle, cellClass, CellContent]);

  return resultJSX;
};

export type CellProps = Props;
export default Cell;
