import { useLayoutEffect, useRef } from "react";
import "./Hero.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Hero() {
  const context = useRef(null);
  const image = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to("#hero__image", {
        scrollTrigger: {
          trigger: "#hero__image",
          start: "top center",
          end: "center top",
          scrub: true,
          markers: true,
        },
        rotation: 8,
        // // transformOrigin: "left 50%",
      });
      // gsap.to("#hero__description__bg", {
      //   scrollTrigger: {
      //     trigger: "#hero__description__bg",
      //     start: "top bottom",
      //     end: "bottom bottom",
      //     scrub: true,
      //     markers: true,
      //   },
      //   lineHeight: 1.5,
      //   visibility: "visible",
      //   opacity: 1,
      // });
    }, context);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={context}>
      <section id="hero__title">
        <h1>
          DRWD maakt <span>websites</span> voor de MKB-sector
        </h1>
      </section>
      <div id="hero__image" ref={image} />
      <section id="hero__description__bg" />
      <section id="hero__description">
        <b>
          Met een website van drwd legt u de essentie van uw bedrijf vast in een
          aantrekkelijk ontwerp dat doelgericht uw klanten bereikt.
        </b>
        <p>
          Wij geloven dat alleen een maatwerk website dit aan u kan bieden, bij
          ons is geen enkele website hetzelfde.
        </p>
        <p>
          Om maatwerk te kunnen leveren is uw verhaal het aller belangrijkst.
          Laten we daarom snel contact met elkaar opnemen.
        </p>
      </section>
    </div>
  );
}

export default Hero;
