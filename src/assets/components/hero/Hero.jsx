import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

import { gsap, Power1, Power4 } from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Hero() {
  const context = useRef(null);
  const image = useRef(null);
  const background = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
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
      ScrollTrigger.refresh(true);
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
          duration: 0.75,
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
      gsap.to("#hero__bg", {
        scrollTrigger: {
          trigger: "#hero__bg",
          start: "-100% center",
          end: "-50% top",
          scrub: true,
          // markers: true,
        },
        rotation: -4,
      });
      gsap.to("#hero__description__p1", {
        scrollTrigger: {
          trigger: "#hero__description__p1",
          start: "top bottom",
          // scrub: true,
          // markers: true,
        },
        y: 0,
        visibility: "visible",
        opacity: 1,
      });
      gsap.to("#hero__description__p2", {
        scrollTrigger: {
          trigger: "#hero__description__p2",
          start: "top bottom",
          // scrub: true,
          // markers: true,
        },
        y: 0,
        visibility: "visible",
        opacity: 1,
      });
      gsap.to("#hero__description__p3", {
        scrollTrigger: {
          trigger: "#hero__description__p3",
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

  return (
    <header ref={context}>
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
      <div className="container">
        <div className="black-background" id="hero__bg" ref={background} />
        <section id="hero__description">
          <p className="highlight bold" id="hero__description__p1">
            Met een website van drwd legt u de essentie van uw bedrijf vast in
            een aantrekkelijk ontwerp dat doelgericht uw klanten bereikt.
          </p>
          <p id="hero__description__p2">
            Wij geloven dat alleen een maatwerk website dit aan u kan bieden,
            bij ons is geen enkele website hetzelfde.
          </p>
          <p id="hero__description__p3">
            Om maatwerk te kunnen leveren is uw verhaal het aller belangrijkst.
            Laten we daarom snel <Link>contact</Link> met elkaar opnemen.
          </p>
        </section>
      </div>
    </header>
  );
}

export default Hero;
