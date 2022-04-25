import { CSSProperties, Profiler } from "react";
import classes from "./Pattern.module.scss";

interface JSXProps {
  patternStyle?: CSSProperties;
  cellStyle?: CSSProperties;
  borderStyle?: CSSProperties;
}

const PatternCellJSX = ({ patternStyle, cellStyle, borderStyle }: JSXProps) => {
  return (
    <Profiler id='PATTERNCELL' onRender={(...args) => console.log(args)}>
      <div className={classes.Cell} style={cellStyle}></div>
      <div className={classes.Pattern} style={patternStyle}></div>
      <div className={classes.Border} style={borderStyle}></div>
    </Profiler>
  );
};
export default PatternCellJSX;
