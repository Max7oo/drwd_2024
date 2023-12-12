import { useLayoutEffect, useRef } from "react";
import { gsap, Power1 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./NavBar.css";
import logo from "../../images/icon.svg";

function NavBar() {
  const context = useRef(null);
  const nav = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 1 } });
      tl.fromTo(
        nav.current,
        { y: "-100%" },
        { y: "0%", ease: Power1.easeInOut }
      );
      //   gsap.to("#nav", {
      //     scrollTrigger: {
      //       trigger: "#nav",
      //       start: "200% top",
      //       //   end: "200% top",
      //       //   scrub: true,
      //       markers: true,
      //     },
      //     // top: 0,
      //     position: "fixed",
      //     backgroundColor: "var(--text-white)",
      //   });
    }, context);

    return () => ctx.revert();
  }, []);
  return (
    <div ref={context}>
      <nav id="nav" ref={nav}>
        <img src={logo} alt="De Ruiter Webdevelopment Logo" />
        <div>
          <button className="primary">Contact</button>
          <button className="secondary">
            <p>Menu</p>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
