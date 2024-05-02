import "./Footer.css";
import logo from "../../images/logo.svg";
import instagram from "../../images/footer/instagram.svg";
import linkedin from "../../images/footer/linkedin.svg";
import web from "../../images/footer/web.svg";
import call from "../../images/footer/call.svg";
import email from "../../images/footer/send.svg";
import icon from "../../images/icon.svg";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

function Footer() {
  const context = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (window.innerWidth >= 1200 && window.innerWidth < 1800) {
      let ctx = gsap.context(() => {
        gsap.to("#footer", {
          scrollTrigger: {
            trigger: "#footer",
            start: "-150px 75%",
            end: "-150px 25%",
            scrub: true,
            // markers: true,
          },
          padding: "150px 10% 25px 10%",
          margin: "0px",
        });
      }, context);
      return () => ctx.revert();
    }
    if (window.innerWidth >= 1800 && window.innerWidth < 2200) {
      let ctx = gsap.context(() => {
        gsap.to("#footer", {
          scrollTrigger: {
            trigger: "#footer",
            start: "-150px 75%",
            end: "-150px 25%",
            scrub: true,
            // markers: true,
          },
          padding: "150px 15% 25px 15%",
          margin: "0px",
        });
      }, context);
      return () => ctx.revert();
    }
    if (window.innerWidth >= 2200) {
      let ctx = gsap.context(() => {
        gsap.to("#footer", {
          scrollTrigger: {
            trigger: "#footer",
            start: "-150px 75%",
            end: "-150px 25%",
            scrub: true,
            // markers: true,
          },
          padding: "150px 20% 25px 20%",
          margin: "0px",
        });
      }, context);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div ref={context}>
      <footer id="footer">
        <div id="footer__box">
          <img src={logo} alt="De Ruiter Webdevelopment" id="footer__logo" />
          <span className="footer__line" id="footer__line" />
          <div>
            <p className="highlight">Sociale media</p>
            <div id="footer__sm">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/drwd.nl/"
              >
                <img src={instagram} alt="Instagram De Ruiter Webdevelopment" />
                <p>Volg ons</p>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/bas-de-ruiter-5ab109b1/"
              >
                <img src={linkedin} alt="LinkedIn Bas de Ruiter" />
                <p>Bas de Ruiter</p>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/max-de-ruiter-2a8871181/"
              >
                <img src={linkedin} alt="LinkedIn Max de Ruiter" />
                <p>Max de Ruiter</p>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://maxderuiter.com/"
              >
                <img src={web} alt="Portfolio website Max de Ruiter" />
                <p>Max de Ruiter</p>
              </a>
            </div>
            <p className="highlight">Contact ons</p>
            <div id="footer__contact">
              <a rel="noopener noreferrer" href="tel:31621324900">
                <img src={call} alt="Bel ons" />
                <p>Bel ons op mobiel</p>
              </a>
              <a rel="noopener noreferrer" href="mailto:info@drwd.nl">
                <img src={email} alt="Mail ons" />
                <p>Stuur ons een email</p>
              </a>
            </div>
          </div>
        </div>
        <span className="footer__line" />
        <div id="footer__mobile">
          <div id="footer__info">
            <Link to="/privacy">Privacy statement</Link>
            <p>KvK: 76769852</p>
          </div>
          <div id="footer__credits">
            <p>© De Ruiter Webdevelopment</p>
            <img src={icon} alt="De Ruiter Webdevelopment" />
          </div>
        </div>
        <div id="footer__desktop">
          <p>© De Ruiter Webdevelopment</p>
          <a>Privacy statement</a>
          <p>KvK: 76769852</p>
          <img src={icon} alt="De Ruiter Webdevelopment" />
        </div>
      </footer>
    </div>
  );
}

export default Footer;
