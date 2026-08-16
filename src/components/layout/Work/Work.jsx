import { useKeenSlider } from "keen-slider/react";
import { useTranslation } from "react-i18next";
import "keen-slider/keen-slider.min.css";
import "./index.css";
import Content from "../Content/Content";
import SectionTitle from "../../ui/SectionTitle/SectionTitle";

import Work1 from "../../../assets/img/Work/1.webp";
import Work2 from "../../../assets/img/Work/2.webp";
import Work3 from "../../../assets/img/Work/3.webp";
import Work4 from "../../../assets/img/Work/4.webp";
import Work5 from "../../../assets/img/Work/5.webp";
import Work6 from "../../../assets/img/Work/6.webp";
import Work7 from "../../../assets/img/Work/7.webp";
import Work8 from "../../../assets/img/Work/8.webp";
import Work9 from "../../../assets/img/Work/9.webp";

import Work11 from "../../../assets/img/Work/88.webp";
import Work22 from "../../../assets/img/Work/22.webp";
import Work33 from "../../../assets/img/Work/33.webp";
import Work44 from "../../../assets/img/Work/99.webp";
import Work55 from "../../../assets/img/Work/55.webp";
import Work66 from "../../../assets/img/Work/66.webp";
import Work77 from "../../../assets/img/Work/77.webp";
import Work88 from "../../../assets/img/Work/44.webp";
import Work99 from "../../../assets/img/Work/11.webp";

const animation = { duration: 80000, easing: (t) => t };
const reverseAnimation = { duration: 90000, easing: (t) => t };

const Work = () => {
  const { t } = useTranslation();

  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: false,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  const [sliderRef2] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: false,
    created(s) {
      s.moveToIdx(-5, true, reverseAnimation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs - 5, true, reverseAnimation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs - 5, true, reverseAnimation);
    },
  });

  return (
    <Content>
      <div className="work-container" id="portfolio">
        <SectionTitle title={t("work.title")} />

        <div className="work-content d-flex flex-column">
          <div ref={sliderRef} className="keen-slider mt-5">
            <div className="keen-slider__slide">
              <a
                href="https://delbet.pages.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work1} alt={t("work.items.1")} />
              </a>
              <a
                href="https://livebet-9.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work2} alt={t("work.items.2")} />
              </a>
              <a
                href="https://www.condev.ir"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work3} alt={t("work.items.3")} />
              </a>
            </div>

            <div className="keen-slider__slide">
              <a
                href="https://dino-shop.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work4} alt={t("work.items.4")} />
              </a>
              <a
                href="https://spin-wheel-con.pages.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work5} alt={t("work.items.5")} />
              </a>
              <a
                href="https://betsisi-2.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work6} alt={t("work.items.6")} />
              </a>
            </div>

            <div className="keen-slider__slide">
              <a
                href="https://condevtp.github.io/livebet14/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work7} alt={t("work.items.7")} />
              </a>
              <a
                href="https://condevtp.github.io/livebet18/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work8} alt={t("work.items.8")} />
              </a>
              <a
                href="https://condevtp.github.io/livebet16/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work9} alt={t("work.items.9")} />
              </a>
            </div>
          </div>

          <div ref={sliderRef2} className="keen-slider keen-slider2">
            <div className="keen-slider__slide">
              <a
                href="https://condevtp.github.io/livebet15/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work11} alt={t("work.items.10")} />
              </a>
              <a
                href="https://condevtp.github.io/livebet12/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work22} alt={t("work.items.11")} />
              </a>
              <a
                href="https://livebet-10.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work33} alt={t("work.items.12")} />
              </a>
            </div>

            <div className="keen-slider__slide">
              <a
                href="https://condevtp.github.io/livebet11/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work44} alt={t("work.items.13")} />
              </a>
              <a
                href="https://livebet-8.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work55} alt={t("work.items.14")} />
              </a>
              <a
                href="https://condevtp.github.io/livebet13/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work66} alt={t("work.items.15")} />
              </a>
            </div>

            <div className="keen-slider__slide">
              <a
                href="https://mines-stake.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work77} alt={t("work.items.16")} />
              </a>
              <a
                href="https://plinko-stake.pages.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work88} alt={t("work.items.17")} />
              </a>
              <a
                href="https://limbo-stake.pages.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Work99} alt={t("work.items.18")} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Work;
