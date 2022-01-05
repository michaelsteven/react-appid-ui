import React from "react";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation("pages");
  return (
    <div className="page">
      <div className="title">{t("homepage.title")}</div>
      <div>{t("homepage.instructions")}</div>
    </div>
  );
}
