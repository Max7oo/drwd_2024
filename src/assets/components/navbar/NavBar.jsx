import { useEffect, useRef, useState } from "react";
import { gsap, Power1 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import "./NavBar.css";
import logo from "../../images/icon.svg";

function NavBar() {
  const context = useRef(null);
  const nav = useRef(null);

  const [openMenu, setOpenMenu] = useState(true);

  // https://codepen.io/Mamboleoo/pen/poLEKob

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Observer);
  gsap.registerPlugin(ScrollToPlugin);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 1 } });
      tl.fromTo(
        nav.current,
        { marginTop: "-100%" },
        { marginTop: "0%", ease: Power1.easeInOut }
      );
      Observer.create({
        target: window,
        type: "scroll",
        tolerance: 50,
        onUp: () => nav.current.classList.remove("is-hidden"),
        onDown: () => nav.current.classList.add("is-hidden"),
      });
    }, context);

    return () => ctx.revert();
  }, []);

  const menu = () => {
    let ctx = gsap.context(() => {
      if (openMenu) {
        gsap.to("#menu", {
          x: 0,
          visibility: "visible",
          opacity: 1,
        });
        setOpenMenu(!openMenu);
      } else {
        gsap.to("#menu", {
          x: 100,
          visibility: "hidden",
          opacity: 0,
        });
        setOpenMenu(!openMenu);
      }
    }, context);

    return () => ctx.revert();
  };

  const scrollToItem = (item) => {
    console.log(item);
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${item}`, offsetY: 50 },
      ease: "Power1.easeInOut",
    });
    menu();
  };

  return (
    <div ref={context}>
      <nav id="nav" ref={nav}>
        <img src={logo} alt="De Ruiter Webdevelopment Logo" />
        <div>
          {/* <button className="primary">Contact</button> */}
          <button className="secondary" onClick={() => menu()}>
            <p>Menu</p>
          </button>
        </div>
      </nav>
      <div id="menu">
        <button onClick={() => scrollToItem("portfolio")}>Portfolio</button>
        <button onClick={() => scrollToItem("services")}>Services</button>
        <button onClick={() => scrollToItem("contact")}>Contact</button>
      </div>
    </div>
  );
}

export default NavBar;
