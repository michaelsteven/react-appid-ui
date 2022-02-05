import React from "react";
import { Spinner } from "./Spinner";
import { useTranslation } from "react-i18next";

export const Loader = () => {
  const { t } = useTranslation("common");
  return (
    <div style={{ padding: "24px" }}>
      <Spinner />
      <div>{t("loading")}</div>
    </div>
  );
};
