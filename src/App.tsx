import SimpleAnimatedBg from "./AnimatedBackgrounds/SimpleBg/SimpleBg";
import { useScreen } from "./Contexts/ScreenProvider";
import "./global.scss";

function App() {
  const { innerWidth, innerHeight } = useScreen();

  const bgProps = {
    width: innerWidth,
    height: innerHeight,
    cellSize: 50,
    gap: 5,
  };
  return <SimpleAnimatedBg {...bgProps} />;
}

export default App;
