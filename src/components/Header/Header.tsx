import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProfileMenu from "../Navigation/ProfileMenu";
import HamburgerMenu from "../Navigation/HamburgerMenu";

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate("/appid/logout");
    window.location.reload();
  };

  return (
    <div className="header" data-testid="component-header-div">
      <div className="items" data-testid="component-header-upper-div">
        <HamburgerMenu />
        <Link to={"/"}>{t("app_name")}</Link>
        <ProfileMenu onLogoutClick={handleLogoutClick} />
      </div>
    </div>
  );
}
