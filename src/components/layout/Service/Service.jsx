import SectionTitle from "../../ui/SectionTitle/SectionTitle";
import Content from "../Content/Content";
import "./index.css";
import {
  FaAtom,
  FaBrain,
  FaDatabase,
  FaRocket,
  FaNetworkWired,
  FaFigma,
  FaChartLine,
  FaPalette,
  FaGears,
} from "react-icons/fa6";
import React from "react";
import { useTranslation } from "react-i18next";

const Service = () => {
  const { t } = useTranslation();

  return (
    <Content>
      <section
        className="service-container"
        id="services"
        aria-labelledby="services-title"
      >
        <SectionTitle title={t("services.title")} id="services-title" />

        <div className="service-content mt-5 w-100" role="list">
          <article className="service-item" role="listitem">
            <FaAtom className="service-icon" aria-hidden="true" />
            <h5>{t("services.items.0")}</h5>
          </article>

          <article className="service-item" role="listitem">
            <FaBrain className="service-icon" aria-hidden="true" />
            <h5>{t("services.items.1")}</h5>
          </article>

          <article className="service-item" role="listitem">
            <FaDatabase className="service-icon" aria-hidden="true" />
            <h5>{t("services.items.2")}</h5>
          </article>

          <article className="service-item" role="listitem">
            <FaRocket className="service-icon" aria-hidden="true" />
            <h5>{t("services.items.3")}</h5>
          </article>

          <article className="service-item" role="listitem">
            <FaNetworkWired className="service-icon" aria-hidden="true" />
            <h5>{t("services.items.4")}</h5>
          </article>

          <article className="service-item" role="listitem">
            <FaFigma className="service-icon" aria-hidden="true" />
            <h5>{t("services.items.5")}</h5>
          </article>

          <article className="service-item" role="listitem">
            <FaChartLine className="service-icon" aria-hidden="true" />
            <h5>{t("services.items.6")}</h5>
          </article>

          <article className="service-item" role="listitem">
            <FaPalette className="service-icon" aria-hidden="true" />
            <h5>{t("services.items.7")}</h5>
          </article>

          <article className="service-item" role="listitem">
            <FaGears className="service-icon" aria-hidden="true" />
            <h5>{t("services.items.8")}</h5>
          </article>
        </div>
      </section>
    </Content>
  );
};

export default React.memo(Service);
