import "./Contact.css";
import contact from "../../images/bas-en-max.jpg";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Contact() {
  const context = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to("#contact__image", {
        scrollTrigger: {
          trigger: "#contact__image",
          start: "top center",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
        rotation: -4,
      });
      if (window.innerWidth < 1200) {
        gsap.to("#contact__description", {
          scrollTrigger: {
            trigger: "#contact__description",
            start: "top bottom",
          },
          y: 0,
          visibility: "visible",
          opacity: 1,
        });
        gsap.to("#contact__modal__title", {
          scrollTrigger: {
            trigger: "#contact__modal__title",
            start: "top bottom",
            // scrub: true,
            // markers: true,
          },
          y: 0,
          visibility: "visible",
          opacity: 1,
        });
      } else {
        gsap.to("#contact__description", {
          scrollTrigger: {
            trigger: "#contact__description",
            start: "-100% 75%",
          },
          y: 0,
          visibility: "visible",
          opacity: 1,
        });
        gsap.to("#contact__modal__title", {
          scrollTrigger: {
            trigger: "#contact__description",
            start: "0% 75%",
            // scrub: true,
            // markers: true,
          },
          y: 0,
          visibility: "visible",
          opacity: 1,
        });
      }
    }, context);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={context}>
      <div>
        <p id="contact__description" className="highlight">
          Wij zijn 2 broers met een passie voor het maken van{" "}
          <span>doeltreffende en aantrekkelijke websites</span> voor bedrijven
          met een interessant verhaal.
        </p>
        <img src={contact} alt="Bas & Max" id="contact__image" />
      </div>
      <div id="contact__modal">
        <h2 id="contact__modal__title">
          <span />
          Ben jij het volgende verhaal?
        </h2>
        <input type="text" id="name" name="name" placeholder="Uw naam" />
        <input type="email" id="email" name="email" placeholder="Uw email" />
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Onderwerp"
        />
        <textarea
          rows="3"
          id="message"
          name="message"
          placeholder="Type hier uw bericht"
        />
        <label>
          This site is protected by reCAPTCHA and the{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Google Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Service
          </a>{" "}
          apply.
        </label>
        <button className="tertiary">Inspireer ons</button>
      </div>
    </section>
  );
}

export default Contact;
