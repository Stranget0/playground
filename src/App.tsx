import SimpleAnimatedBg from "./AnimatedBackgrounds/SimpleBg/SimpleBg";
import { useScreen } from "./Contexts/ScreenProvider";
import "./global.scss";

function App() {
  const { innerWidth, innerHeight } = useScreen();

  return (
    <SimpleAnimatedBg
      width={innerWidth}
      height={innerHeight}
    />
  );
}

export default App;
