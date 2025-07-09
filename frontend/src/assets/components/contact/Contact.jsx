import "./Contact.css";
import contact from "../../images/bas-en-max.jpg";
import axios from "axios";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"; // Correct package import

function Contact() {
  const { executeRecaptcha } = useGoogleReCaptcha(); // Initialize reCAPTCHA
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            start: "-100% 75%",
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Naam is vereist.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is vereist.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ongeldig e-mailadres.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Onderwerp is vereist.";
    if (!formData.message.trim()) newErrors.message = "Bericht is vereist.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!executeRecaptcha) {
      setErrorMessage("reCAPTCHA is nog niet beschikbaar.");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const recaptchaToken = await executeRecaptcha("submit");
      const formDataWithToken = { ...formData, recaptchaToken };

      await axios.post(
        "http://127.0.0.1/drwd_2024/api/submit_form",
        formDataWithToken
      );

      setSuccessMessage("Bedankt voor je bericht! We nemen snel contact op.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setErrorMessage(
        "Er is iets misgegaan bij het verzenden. Probeer het later opnieuw."
      );
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Uw naam"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Uw email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Onderwerp"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && <span className="error">{errors.subject}</span>}

          <textarea
            rows="3"
            id="message"
            name="message"
            placeholder="Type hier uw bericht"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <span className="error">{errors.message}</span>}
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
          {successMessage && <p className="success">{successMessage}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}

          <button
            className="g-recaptcha tertiary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verzenden..." : "Inspireer ons"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
