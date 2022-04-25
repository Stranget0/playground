import { CSSProperties } from "react";

export default function mergeStyles(...styles: (CSSProperties | undefined)[]) {
  const result = styles.reduce((acc, style) => {
    if (!acc || !style) return acc;
    let transform = acc.transform || style.transform;
    if (acc.transform && style.transform)
      transform = `${acc.transform} ${style.transform}`;
    if (transform) return { ...acc, ...style, transform };
    return { ...acc, ...style };
  });
  return result;
}
