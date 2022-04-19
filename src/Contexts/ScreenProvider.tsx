import {
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

type State = Pick<
  Window,
  "innerWidth" | "innerHeight" | "outerHeight" | "outerWidth"
>;
const { innerHeight, innerWidth, outerHeight, outerWidth } = window;
const initial: State = {
  innerHeight,
  innerWidth,
  outerHeight,
  outerWidth,
};
const screenContext = createContext<State>(initial);

type Props = { children: ReactElement };
const ScreenProvider: FC<Props> = ({ children }) => {
  const [screenData, setScreenData] = useState(initial);
	console.log(screenData);
	
  useEffect(() => {
    function update() {
      const { innerHeight, innerWidth, outerHeight, outerWidth } = window;
      setScreenData({ innerHeight, innerWidth, outerHeight, outerWidth });
    }
    addEventListener("resize", update);
    return () => {
      removeEventListener("resize", update);
    };
  }, []);

  return (
    <screenContext.Provider value={screenData}>
      {children}
    </screenContext.Provider>
  );
};

export const useScreen = () => useContext(screenContext);
export default ScreenProvider;
