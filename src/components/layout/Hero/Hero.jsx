import Content from "../Content/Content";
import "./index.css";
import { TypeAnimation } from "react-type-animation";
import {
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa6";
import Box1 from "../../../assets/img/box-hero-1.webp";
import Box2 from "../../../assets/img/box-hero-2.webp";
import Box3 from "../../../assets/img/box-hero-3.webp";
import { Link } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";
import resumeEn from "../../../resume/en-condev-resume.pdf";
import resumeFa from "../../../resume/fa-condev-resume.pdf";

const Hero = () => {
  const { t, i18n } = useTranslation();

  const currentResume = i18n.language === "fa" ? resumeFa : resumeEn;

  return (
    <Content>
      <section
        className="hero w-100 d-flex justify-content-center align-items-center flex-column"
        id="home"
      >
        <h1>
          {t("hero.title").split("/")[0]}
          <h1 className="d-none d-md-inline" style={{ color: "#ffc700" }}>
            /
          </h1>
          <br className="d-md-none" />
          {t("hero.title").split("/")[1]}
        </h1>

        <div className="mt-4 pt-2">
          <TypeAnimation
            sequence={[
              ...t("hero.typing", { returnObjects: true }).flatMap((item) => [
                item,
                2000,
              ]),
            ]}
            wrapper="h2"
            speed={200}
            style={{ direction: "ltr" }}
            repeat={Infinity}
          />
        </div>

        <a
          href={currentResume}
          download={
            i18n.language === "fa"
              ? "ConDev-Resume-FA.pdf"
              : "ConDev-Resume-EN.pdf"
          }
          style={{ textDecoration: "none" }}
        >
          <button
            className="mt-5"
            type="button"
            aria-label={t("hero.downloadResume")}
          >
            {t("hero.downloadResume")}
          </button>
        </a>

        <div className="social-icons d-flex justify-content-center align-items-center mt-5">
          <a
            className="mx-1 mx-md-2 social-item"
            href="https://www.instagram.com/con.dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            className="mx-1 mx-md-2 social-item"
            href="https://github.com/ConDevTp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            className="mx-1 mx-md-2 social-item"
            href="https://www.linkedin.com/in/con-dev-5b43a538b"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            className="mx-1 mx-md-2 social-item"
            href="https://www.youtube.com/@ConDev-Tp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
          <a
            className="mx-1 mx-md-2 social-item"
            href="https://pin.it/53DQhi58N"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pinterest"
          >
            <FaPinterestP />
          </a>
        </div>

        <div className="mt-5 pt-md-4 w-100 box-hero">
          <img src={Box1} alt="" loading="lazy" />
          <img src={Box2} alt="" loading="lazy" />
          <img src={Box3} alt="" loading="lazy" />
        </div>
      </section>
    </Content>
  );
};

export default React.memo(Hero);
