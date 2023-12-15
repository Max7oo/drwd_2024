import { useRef } from "react";
import "./Services.css";

// import { gsap, Power1, Power4 } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

function Services() {
  const context = useRef(null);

  return (
    <div ref={context}>
      <section id="services">
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
        <table id="customers">
          <tr>
            <th>Websites</th>
            <td>
              Maken wij met behulp van WordPress maar kunnen ook compleet custom
              gemaakt worden.
            </td>
          </tr>
          <tr>
            <th>Huisstijlen</th>
            <td>
              Creëren wij samen met u om uw merk zo goed mogelijk naar voren te
              laten komen.
            </td>
          </tr>
          <tr>
            <th>Teksten</th>
            <td>Kunnen wij samen met u of voor u schrijven.</td>
          </tr>
          <tr>
            <th>Hosting</th>
            <td>
              Van uw websites bieden wij om ervoor te zorgen dat wij altijd de
              beste kwaliteit kunnen bieden.
            </td>
          </tr>
        </table>
      </section>
    </div>
  );
}

export default Services;
