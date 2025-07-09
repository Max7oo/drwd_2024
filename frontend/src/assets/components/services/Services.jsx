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
          start: "-100% bottom",
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
      if (window.innerWidth < 1200) {
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
      } else {
        gsap.to("#services__items__1", {
          scrollTrigger: {
            trigger: "#services__items",
            start: "10% 75%",
            // markers: true,
          },
          x: 0,
          visibility: "visible",
          opacity: 1,
        });
        gsap.to("#services__items__2", {
          scrollTrigger: {
            trigger: "#services__items",
            start: "20% 75%",
          },
          x: 0,
          visibility: "visible",
          opacity: 1,
        });
        gsap.to("#services__items__3", {
          scrollTrigger: {
            trigger: "#services__items",
            start: "30% 75%",
          },
          x: 0,
          visibility: "visible",
          opacity: 1,
        });
        gsap.to("#services__items__4", {
          scrollTrigger: {
            trigger: "#services__items",
            start: "40% 75%",
          },
          x: 0,
          visibility: "visible",
          opacity: 1,
        });
      }
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
        <div id="services__desktop">
          <p id="services__description" className="highlight bold">
            Onze services zijn gericht op het verbeteren van uw online
            aanwezigheid. In de hedendaagse maatschappij is dit essentieël, dus
            ook voor u.
          </p>
          <span id="services__line" />
          <table id="services__items">
            <tbody>
              <tr id="services__items__1">
                <th className="no-padding-top">Websites</th>
                <td>
                  Van maatwerk websites tot slimme oplossingen in WordPress,
                  Shopify en Squarespace – wij bouwen digitale ervaringen die
                  werken.
                </td>
              </tr>
              <tr id="services__items__2">
                <th>Huisstijlen</th>
                <td>
                  Wij ontwikkelen samen met u een doordachte huisstijl die uw
                  merk optimaal positioneert.
                </td>
              </tr>
              <tr id="services__items__3">
                <th>Teksten</th>
                <td>
                  Professionele teksten – samen met u of volledig verzorgd door
                  ons.
                </td>
              </tr>
              <tr id="services__items__4">
                <th>Hosting</th>
                <td>
                  Wij bieden hoogwaardige hosting voor uw websites, zodat u
                  altijd verzekerd bent van de beste kwaliteit en optimale
                  prestaties.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Services;
