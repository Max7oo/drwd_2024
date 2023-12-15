import "./App.css";
import Hero from "./assets/components/hero/Hero";
import Portfolio from "./assets/components/portfolio/Portfolio";
import Services from "./assets/components/services/Services";
import MainLayOut from "./layout/MainLayOut";

function App() {
  return (
    <MainLayOut>
      <Hero />
      <Portfolio />
      <Services />
    </MainLayOut>
  );
}

export default App;
