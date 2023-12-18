import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Portfolio.css";
import portfolio from "./data.json";
import arrow from "../../images/arrow_down.svg";

function Portfolio() {
  const context = useRef(null);

  const initialDirections = Array(portfolio.length).fill(true); // Initialize all directions to true

  const [directions, setDirections] = useState(initialDirections);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to("#portfolio__title", {
        scrollTrigger: {
          trigger: "#portfolio__title",
          start: "top bottom",
          // scrub: true,
          // markers: true,
        },
        y: 0,
        visibility: "visible",
        opacity: 1,
      });
      // portfolio.forEach(function callback(value, index) {
      //   gsap.to(`#card${index} .portfolio__item__card`, {
      //     scrollTrigger: {
      //       trigger: `#card${index} .portfolio__item__card`,
      //       start: "top center",
      //       // scrub: true,
      //       // markers: true,
      //       toggleActions: "play none none reverse",
      //     },
      //     y: 0,
      //     position: "relative",
      //   });
      //   gsap.to(`#card${index} .portfolio__item__card__title`, {
      //     scrollTrigger: {
      //       trigger: `#card${index} .portfolio__item__card`,
      //       start: "top center",
      //       // scrub: true,
      //       // markers: true,
      //       toggleActions: "play none none reverse",
      //     },
      //     visibility: "visible",
      //     opacity: 1,
      //   });
      // });
    }, context);

    return () => ctx.revert();
  }, []);

  const arrowHandler = (index) => {
    if (directions[index]) {
      const updatedDirections = [...directions];
      updatedDirections[index] = !directions[index];
      setDirections(updatedDirections);
      let ctx = gsap.context(() => {
        gsap.to(`#card${index} .portfolio__item__card`, {
          y: 0,
          position: "relative",
        });
        gsap.to(`#card${index} .portfolio__item__card__title`, {
          visibility: "visible",
          opacity: 1,
        });
        gsap.to(`#card${index} .portfolio__item__card__text`, {
          y: 0,
          position: "relative",
          visibility: "visible",
          opacity: 1,
        });
        gsap.to(`#card${index} .portfolio__item__card__arrow`, {
          backgroundColor: "var(--active)",
          borderColor: "var(--active)",
          rotate: "-180deg",
        });
      }, context);

      return () => ctx.revert();
    } else {
      const updatedDirections = [...directions];
      updatedDirections[index] = !directions[index];
      setDirections(updatedDirections);
      let ctx = gsap.context(() => {
        gsap.to(`#card${index} .portfolio__item__card__text`, {
          y: -100,
          position: "absolute",
          visibility: "hidden",
          opacity: 0,
        });
        gsap.to(`#card${index} .portfolio__item__card__arrow`, {
          backgroundColor: "transparent",
          borderColor: "var(--highlight)",
          rotate: "0deg",
        });
        gsap.to(`#card${index} .portfolio__item__card`, {
          y: -100,
          position: "absolute",
        });
        gsap.to(`#card${index} .portfolio__item__card__title`, {
          visibility: "hidden",
          opacity: 0,
        });
      }, context);

      return () => ctx.revert();
    }
  };

  return (
    <section id="portfolio" ref={context}>
      <h2 id="portfolio__title">
        <span />
        Portfolio
      </h2>
      {portfolio.map((item, index) => {
        const { title, category, text, img } = item;
        return (
          <div id={`card${index}`} key={index} className="portfolio__item">
            <img src={img} className="portfolio__item__img" alt={title} />
            <div className="portfolio__item__card">
              <div className="portfolio__item__card__title">
                <h3>{title}</h3>
                <h4>{category}</h4>
              </div>
              <img
                src={arrow}
                className="portfolio__item__card__arrow"
                alt="Expand"
                onClick={() => arrowHandler(index)}
              />
            </div>
            <p className="portfolio__item__card__text">{text}</p>
          </div>
        );
      })}
    </section>
  );
}

export default Portfolio;
