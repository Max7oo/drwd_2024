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
      <img src={logo} alt="De Ruiter Webdevelopment" id="footer__logo" />
      <span className="footer__line" />
      <p className="highlight">Sociale media</p>
      <div id="footer__sm">
        <span>
          <img src={instagram} alt="Instagram De Ruiter Webdevelopment" />
          <p>Volg ons</p>
        </span>
        <span>
          <img src={linkedin} alt="LinkedIn Bas de Ruiter" />
          <p>Bas de Ruiter</p>
        </span>
        <span>
          <img src={linkedin} alt="LinkedIn Max de Ruiter" />
          <p>Max de Ruiter</p>
        </span>
        <span>
          <img src={web} alt="Portfolio website Max de Ruiter" />
          <p>Max de Ruiter</p>
        </span>
      </div>
      <p className="highlight">Contact ons</p>
      <div id="footer__contact">
        <span>
          <img src={call} alt="Bel ons" />
          <p>Bel ons op mobiel</p>
        </span>
        <span>
          <img src={email} alt="Mail ons" />
          <p>Stuur ons een email</p>
        </span>
      </div>
      <span className="footer__line" />
      <div id="footer__info">
        <a>
          <p>Privacy statement</p>
        </a>
        <p>KvK: 76769852</p>
      </div>
      <div id="footer__credits">
        <p>© De Ruiter Webdevelopment</p>
        <img src={icon} alt="De Ruiter Webdevelopment" />
      </div>
    </footer>
  );
}

export default Footer;
