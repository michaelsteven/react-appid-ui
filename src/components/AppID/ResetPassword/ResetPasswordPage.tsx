import React from "react";
import { useTranslation } from "react-i18next";

export function ResetPasswordPage() {
  const { t } = useTranslation("appid");

  return <div className="page">{t("resetpassword.page_title")}</div>;
}
