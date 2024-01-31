import "./Footer.css";
import logo from "../../images/logo.svg";
import instagram from "../../images/footer/instagram.svg";
import linkedin from "../../images/footer/linkedin.svg";
import web from "../../images/footer/web.svg";
import call from "../../images/footer/call.svg";
import email from "../../images/footer/send.svg";
import icon from "../../images/icon.svg";

function Footer() {
  return (
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
          <a>Privacy statement</a>
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
  );
}

export default Footer;
