import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Portfolio.css";
import portfolio from "./data.json";
import arrow from "../../images/arrow_down.svg";

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

  const foldOut = () => {
    let ctx = gsap.context(() => {
      gsap.to(".portfolio__item", {
        y: 0,
        position: "relative",
        width: "100%",
      });
      gsap.to(".portfolio__item__title", {
        visibility: "visible",
        opacity: 1,
      });
    }, context);

    return () => ctx.revert();
  };

  return (
    <div ref={context}>
      <section id="portfolio">
        <h2 id="portfolio__title">
          <span />
          Portfolio
        </h2>
        {portfolio.map((item, index) => {
          const { title, category, text, img } = item;
          return (
            <div id={title} key={index}>
              <img src={img} className="portfolio__item__img" alt={title} />
              <div className="portfolio__item" onMouseOver={foldOut}>
                <div className="portfolio__item__title">
                  <h3>{title}</h3>
                  <h4>{category}</h4>
                </div>
                <img
                  src={arrow}
                  className="portfolio__item__title__arrow"
                  alt="Expand"
                />
              </div>
              <p>{text}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Portfolio;
