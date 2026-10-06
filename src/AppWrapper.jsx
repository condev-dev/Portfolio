import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router";
import App from "./App";
import SeoFa from "./Seo/SeoFa";
import SeoEn from "./Seo/SeoEn";
import applySeo from "./Seo/applySeo";

const AppWrapper = () => {
  const { lng } = useParams(); // fa یا en
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const lang = lng === "fa" || lng === "en" ? lng : "fa";
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
    applySeo(lang);
  }, [lng, i18n]);

  const defaultLang = "fa";
  if (!lng || (lng !== "fa" && lng !== "en"))
    return <Navigate to={`/${defaultLang}`} replace />;

  return (
    <Suspense fallback={<div className="loading">{t("app.loading")}</div>}>
      {i18n.language === "fa" ? <SeoFa /> : <SeoEn />}
      <App />
    </Suspense>
  );
};

export default AppWrapper;
