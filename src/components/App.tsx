import React, { Suspense } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import ProtectedRoutes from "./AppID/common/ProtectedRoutes";
import {
  SignupPage,
  SignupThankYouPage,
  LoginPage,
  ForgotPasswordPage,
  ProfilePage,
  ResetPasswordPage,
  ChangePasswordPage,
  UserManagementPage,
  SupportedLocalesPage,
} from "./AppID";

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
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signupthankyou" element={<SignupThankYouPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/lostpassword" element={<ForgotPasswordPage />} />
      <Route path="/resetpassword" element={<ResetPasswordPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/changepassword" element={<ChangePasswordPage />} />
      </Route>
      <Route element={<ProtectedRoutes oneOfRoles={["user_management"]} />}>
        <Route path="/usermanagement" element={<UserManagementPage />} />
        <Route path="/supportedlocales" element={<SupportedLocalesPage />} />
      </Route>
    </Routes>
  );
}

function Content() {
  return (
    <div className="centerdiv">
      <Header />
      <DefaultSwitch />
    </div>
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
