import { useLayoutEffect, useRef } from "react";
import "./Hero.css";

import { gsap, Power1, Power4 } from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Hero() {
  const context = useRef(null);
  const image = useRef(null);
  const background = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    const ourText = new SplitType("h1", { types: "chars" });
    const chars = ourText.chars;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 1 } });
      tl.add("image");
      tl.fromTo(
        image.current,
        { y: "100%" },
        { y: "0%", ease: Power1.easeInOut },
        "image"
      );
      tl.fromTo(
        background.current,
        { y: "100%" },
        { y: "0%", ease: Power1.easeInOut },
        "image"
      );
      tl.fromTo(
        chars,
        {
          y: 100,
          // opacity: 0,
        },
        {
          y: 0,
          // opacity: 1,
          stagger: 0.05,
          duration: 1.5,
          ease: Power4.easeOut,
        }
      );
      gsap.to("#hero__image", {
        scrollTrigger: {
          trigger: "#hero__image",
          start: "-100% center",
          end: "-50% top",
          scrub: true,
          // markers: true,
        },
        rotation: 4,
      });
      gsap.to("#hero__description__bg", {
        scrollTrigger: {
          trigger: "#hero__description__bg",
          start: "-100% center",
          end: "-50% top",
          scrub: true,
          // markers: true,
        },
        rotation: -4,
      });
    }, context);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={context}>
      <section id="hero__title">
        <h1 id="title">
          <span>DRWD maakt&nbsp;</span>
          <span>
            <span className="highlight">websites</span>&nbsp;voor&nbsp;
          </span>
          <span>de MKB-sector</span>
        </h1>
      </section>
      <div id="hero__image" ref={image} />
      <section id="hero__description__bg" ref={background} />
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
      <section id="test" />
    </div>
  );
}

export default Hero;
