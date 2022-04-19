import {
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { throttle } from "lodash";

type State = Pick<
  MouseEvent,
  "clientX" | "clientY" | "movementX" | "movementY"
>;
const initial: State = {
  clientX: window.innerWidth / 2,
  clientY: window.innerHeight / 2,
  movementX: 0,
  movementY: 0,
};
const mouseContext = createContext<State>(initial);

type Props = { children: ReactElement };
const MouseProvider: FC<Props> = ({ children }) => {
  const [mouseData, setMouseData] = useState(initial);
  useEffect(() => {
    const update = throttle((e: MouseEvent) => {
      const { clientX, clientY, movementX, movementY } = e;
      setMouseData({ clientX, clientY, movementX, movementY });
    }, 200);

    addEventListener("mousemove", update);
    return () => {
      removeEventListener("mousemove", update);
    };
  }, []);

  return (
    <mouseContext.Provider value={mouseData}>{children}</mouseContext.Provider>
  );
};

export const useMouse = () => useContext(mouseContext);
export default MouseProvider;
