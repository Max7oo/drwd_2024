import "./App.css";
import Hero from "./assets/components/hero/Hero";
import Portfolio from "./assets/components/portfolio/portfolio";
import MainLayOut from "./layout/MainLayOut";

function App() {
  return (
    <MainLayOut>
      <Hero />
      <Portfolio />
    </MainLayOut>
  );
}

export default App;
