import { useEffect, useRef } from "react";
import "./Services.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Services() {
  const context = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to("#services__bg", {
        scrollTrigger: {
          trigger: "#services__bg",
          start: "top center",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
        rotation: -4,
      });
      gsap.to("#services__title", {
        scrollTrigger: {
          trigger: "#services__title",
          start: "top bottom",
        },
        y: 0,
        visibility: "visible",
        opacity: 1,
      });
      gsap.to("#services__description", {
        scrollTrigger: {
          trigger: "#services__description",
          start: "top bottom",
        },
        y: 0,
        visibility: "visible",
        opacity: 1,
      });
      gsap.to("#services__line", {
        scrollTrigger: {
          trigger: "#services__line",
          start: "top bottom",
          end: "bottom 25%",
          scrub: true,
        },
        width: "100%",
      });
      gsap.to("#services__items__1", {
        scrollTrigger: {
          trigger: "#services__items__1",
          start: "center bottom",
        },
        x: 0,
        visibility: "visible",
        opacity: 1,
      });
      gsap.to("#services__items__2", {
        scrollTrigger: {
          trigger: "#services__items__2",
          start: "center bottom",
        },
        x: 0,
        visibility: "visible",
        opacity: 1,
      });
      gsap.to("#services__items__3", {
        scrollTrigger: {
          trigger: "#services__items__3",
          start: "center bottom",
        },
        x: 0,
        visibility: "visible",
        opacity: 1,
      });
      gsap.to("#services__items__4", {
        scrollTrigger: {
          trigger: "#services__items__4",
          start: "center bottom",
        },
        x: 0,
        visibility: "visible",
        opacity: 1,
      });
    }, context);

    return () => ctx.revert();
  }, []);

  return (
    <section className="container" ref={context}>
      <div className="black-background" id="services__bg" />
      <div id="services">
        <h2 id="services__title">
          <span />
          Services
        </h2>
        <p id="services__description">
          Onze services zijn gericht op het verbeteren van uw online
          aanwezigheid. In de hedendaagse maatschappij is dit essentieël, dus
          ook voor u.
        </p>
        <span id="services__line" />
        <table id="services__items">
          <tbody>
            <tr id="services__items__1">
              <th>Websites</th>
              <td>
                Maken wij met behulp van WordPress maar kunnen ook compleet
                custom gemaakt worden.
              </td>
            </tr>
            <tr id="services__items__2">
              <th>Huisstijlen</th>
              <td>
                Creëren wij samen met u om uw merk zo goed mogelijk naar voren
                te laten komen.
              </td>
            </tr>
            <tr id="services__items__3">
              <th>Teksten</th>
              <td>Kunnen wij samen met u of voor u schrijven.</td>
            </tr>
            <tr id="services__items__4">
              <th>Hosting</th>
              <td>
                Van uw websites bieden wij om ervoor te zorgen dat wij altijd de
                beste kwaliteit kunnen bieden.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Services;
