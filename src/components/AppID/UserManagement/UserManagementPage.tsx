import React from "react";
import { useTranslation } from "react-i18next";

export function UserManagementPage() {
  const { t } = useTranslation("appid");

  return (
    <div className="page">
      <div>
        <div>
          <div className="title">{t("usermanagement.page_title")}</div>
        </div>
      </div>
    </div>
  );
}
