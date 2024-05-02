import "./App.css";
import Contact from "./assets/components/contact/Contact";
import Footer from "./assets/components/footer/Footer";
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
      <Contact />
      <Footer />
    </MainLayOut>
  );
}

export default App;
