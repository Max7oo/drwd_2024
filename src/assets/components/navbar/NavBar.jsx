import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import "./NavBar.css";
import logo from "../../images/icon.svg";
import close from "../../images/close.svg";

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
      gsap.to(nav.current, {
        marginTop: 0,
        visibility: "visible",
        opacity: 1,
      });
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
          x: "0%",
          opacity: 1,
        });
        setOpenMenu(!openMenu);
      } else {
        gsap.to("#menu", {
          x: "100%",
          opacity: 0,
        });
        setOpenMenu(!openMenu);
      }
    }, context);

    return () => ctx.revert();
  };

  const scrollToItem = (item) => {
    if (item === "services") {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${item}`, offsetY: 100 },
        ease: "Power1.easeInOut",
      });
      menu();
    } else {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${item}`, offsetY: 0 },
        ease: "Power1.easeInOut",
      });
      menu();
    }
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
        <div id="menu__bar">
          <img src={logo} alt="De Ruiter Webdevelopment Logo" />
          <div>
            {/* <button className="primary">Contact</button> */}
            <button className="secondary" onClick={() => menu()}>
              <img src={close} alt="Close menu" />
            </button>
          </div>
        </div>
        <div id="menu__items">
          <button onClick={() => scrollToItem("portfolio")}>
            <span />
            <h2>Portfolio</h2>
          </button>
          <button onClick={() => scrollToItem("services")}>
            <span />
            <h2>Services</h2>
          </button>
          <button onClick={() => scrollToItem("contact")}>
            <span />
            <h2>Contact</h2>
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default NavBar;
