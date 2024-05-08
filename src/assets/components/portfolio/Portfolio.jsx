import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Portfolio.css";
import portfolio from "./data.json";
import arrow from "../../images/arrow_down.svg";

function Portfolio() {
  const context = useRef(null);
  const [load, setLoad] = useState(3);
  const [loadButton, setLoadButton] = useState(true);

  const initialDirections = Array(portfolio.length).fill(true); // Initialize all directions to true

  const [directions, setDirections] = useState(initialDirections);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
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
    }, context);

    return () => ctx.revert();
  }, []);

  const arrowHandler = (index, portfolio) => {
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
        ScrollTrigger.refresh(true);
        for (let i = 0; i < portfolio.length; i++) {
          if (i !== index) {
            gsap.to(`#card${i} .portfolio__item__card__text`, {
              y: -100,
              position: "absolute",
              visibility: "hidden",
              opacity: 0,
            });
            gsap.to(`#card${i} .portfolio__item__card__arrow`, {
              backgroundColor: "transparent",
              borderColor: "var(--highlight)",
              rotate: "0deg",
            });
            gsap.to(`#card${i} .portfolio__item__card`, {
              y: "-100%",
              position: "absolute",
            });
            gsap.to(`#card${i} .portfolio__item__card__title`, {
              visibility: "hidden",
              opacity: 0,
            });
            ScrollTrigger.refresh(true);
          }
        }
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
          y: "-100%",
          position: "absolute",
        });
        gsap.to(`#card${index} .portfolio__item__card__title`, {
          visibility: "hidden",
          opacity: 0,
        });
        ScrollTrigger.refresh(true);
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
      {portfolio.map((item, index, portfolio) => {
        if (index < load) {
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
                  onClick={() => arrowHandler(index, portfolio)}
                />
              </div>
              <p className="portfolio__item__card__text">{text}</p>
            </div>
          );
        }
      })}
      <div id="portfolio__load">
        {loadButton ? (
          <button
            className="primary"
            onClick={() => {
              setLoad(portfolio.length);
              setLoadButton(false);
            }}
          >
            Laad meer items
          </button>
        ) : (
          <button
            className="primary"
            onClick={() => {
              setLoad(3);
              setLoadButton(true);
            }}
          >
            Minder items
          </button>
        )}
      </div>
    </section>
  );
}

export default Portfolio;
