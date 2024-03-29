import { CSSProperties, ReactElement, RefObject } from "react";

export type NodeRect = DOMRect & {
  middleX: number;
  middleY: number;
};
export interface CellFArgs extends NodeRect {
  cellRef: RefObject<HTMLDivElement>;
  countX: number;
  countY: number;
  gridX: number;
  gridY: number;
}
export type GetStyle = (args: CellFArgs) => CSSProperties;
export interface GridPassedProps {
  cellSize: number;
  cellClass?: string;
  getCellStyle?: GetStyle;
  getSecondaryStyle?: GetStyle;
	getContentStyle?: GetStyle;
  CellContent?: (props: { style?: CSSProperties }) => ReactElement | null;
}
