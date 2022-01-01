import React, { Suspense } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import ProfilePage from "./Profile";
import SignupPage from "./AppID/Signup";
import LoginPage from "./AppID/Login";

function Head() {
  const { i18n, t } = useTranslation();

  return (
    <Helmet htmlAttributes={{ lang: i18n.language }}>
      <title>{t("app_name")}</title>
      <meta name="description" content={t("app_description")} />
    </Helmet>
  );
}

/**
 * Default routing switch used after onboarding has been completed.
 * Most new routes should be added here.
 */
function DefaultSwitch() {
  return (
    <Routes>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

function Content() {
  return (
    <>
      <div className="centerdiv">
        <Header />
        <DefaultSwitch />
      </div>
    </>
  );
}

/**
 * The main application component.
 * It provides a suspense fallback for react-i18next, translated head content via react-helmet-async, an app header, and routing.
 */
export default function App() {
  return (
    <Suspense fallback="">
      <HelmetProvider>
        <Head />
        <Content />
      </HelmetProvider>
    </Suspense>
  );
}
