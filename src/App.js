import "./App.css";
import React, { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import AIChatWidget from "./components/Ai/AIChatWidget";

const Header = lazy(() => import("./components/layout/Header/Header"));
const Hero = lazy(() => import("./components/layout/Hero/Hero"));
const About = lazy(() => import("./components/layout/About/About"));
const Skill = lazy(() => import("./components/layout/Skill/Skill"));
const Certs = lazy(() => import("./components/layout/Certs/Certs"));
const Work = lazy(() => import("./components/layout/Work/Work"));
const Article = lazy(() => import("./components/layout/Article/Article"));
const Service = lazy(() => import("./components/layout/Service/Service"));
const Contact = lazy(() => import("./components/layout/Contact/Contact"));
const Footer = lazy(() => import("./components/layout/Footer/Footer"));

function App() {
  const { t } = useTranslation();

  return (
    <Suspense fallback={<div className="loading">{t("app.loading")}</div>}>
      <>
        <Header />
        <Hero />
        <About />
        <Skill />
        <Certs />
        <Work />
        <Article />
        <Service />
        <Contact />
        <Footer />
        {/* Ai */}
        <AIChatWidget />
      </>
    </Suspense>
  );
}

export default App;
