import { createContext, CSSProperties, FC, ReactNode, useContext } from "react";

//#region Types
export type SetCellParam = {
  x: number;
  y: number;
  posX: number;
  posY: number;
};
export type CellContentProps = SetCellParam;

export type CellContextState = {
  cellClass?: string;
  getCellStyle?: getCellStyle;
  CellContent?: FC<CellContentProps>;
};
export type getCellStyle = (params: SetCellParam) => CSSProperties;
//#endregion

const initial: CellContextState = {};
const cellContext = createContext<CellContextState>(initial);

const CellProvider: FC<CellContextState & { children: ReactNode }> = ({
  children,
  ...cellArgs
}) => {
  return (
    <cellContext.Provider value={cellArgs}>{children}</cellContext.Provider>
  );
};

export const useCell = () => useContext(cellContext);
export default CellProvider;
