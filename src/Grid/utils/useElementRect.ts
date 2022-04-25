import { useEffect, useRef, useState } from "react";
import { NodeRect } from "../Containers/types";

const initialRect: NodeRect = {
  middleX: 0,
  middleY: 0,
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON: () => null,
};
export default function useElementRect() {
  const [rect, setRect] = useState(initialRect);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const domRect = ref.current.getBoundingClientRect();
      const { x: viewX, y: viewY, width, height } = domRect;
      const middleX = viewX + width / 2;
      const middleY = viewY + height / 2;
      setRect({ ...domRect, middleX, middleY });
    }
  }, []);
  return { rect, ref };
}
