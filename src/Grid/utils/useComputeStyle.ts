import { useEffect, useState } from "react";
import { CellFArgs, GetStyle } from "../Containers/types";

export default function useComputeStyle(
  getStyle: GetStyle | undefined,
  args: CellFArgs
) {
  const [computedStyle, setComputedStyle] = useState(getStyle?.(args));
  useEffect(
    () => {
      const frame = requestAnimationFrame(() =>
        setComputedStyle(getStyle?.(args))
      );
      return () => cancelAnimationFrame(frame);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getStyle, getStyle && args]
  );
  return computedStyle;
}
