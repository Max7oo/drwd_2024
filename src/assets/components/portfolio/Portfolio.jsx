import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Portfolio.css";

function Portfolio() {
  const context = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to("#portfolio__title", {
        scrollTrigger: {
          trigger: "#portfolio__title",
          start: "top bottom",
          // scrub: true,
          markers: true,
        },
        y: 0,
        visibility: "visible",
        opacity: 1,
      });
    }, context);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={context}>
      <section id="portfolio">
        <h2 id="portfolio__title">
          <span />
          Portfolio
        </h2>
      </section>
    </div>
  );
}

export default Portfolio;
