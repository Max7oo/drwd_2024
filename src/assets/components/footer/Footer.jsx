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
      <p>Sociale media</p>
      <div id="footer__sm">
        <span>
          <img src={instagram} alt="Instagram De Ruiter Webdevelopment" />
          <label>Volg ons</label>
        </span>
        <span>
          <img src={linkedin} alt="LinkedIn Bas de Ruiter" />
          <label>Bas de Ruiter</label>
        </span>
        <span>
          <img src={linkedin} alt="LinkedIn Max de Ruiter" />
          <label>Max de Ruiter</label>
        </span>
        <span>
          <img src={web} alt="Portfolio website Max de Ruiter" />
          <label>Max de Ruiter</label>
        </span>
      </div>
      <p>Contact ons</p>
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
      <a>Privacy statement</a>
      <p>KvK: 76769852</p>
      <div id="footer__credits">
        <p>© De Ruiter Webdevelopment</p>
        <img src={icon} alt="De Ruiter Webdevelopment" />
      </div>
    </footer>
  );
}

export default Footer;
