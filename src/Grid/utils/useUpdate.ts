import { useEffect, useState } from "react";

export default function useIntervalState<T, I extends T | undefined>(
  onTick: () => T,
  updateMs: number,
  initial?: I
) {
  const [value, setValue] = useState(initial as T | undefined);
  useEffect(() => {
    const intervalId = setInterval(() => setValue(onTick), updateMs);
    return () => clearInterval(intervalId);
  }, [onTick, updateMs]);
  return value as I;
}
