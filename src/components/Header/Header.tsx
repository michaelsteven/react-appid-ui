import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProfileMenu from "../Navigation/ProfileMenu";
import HamburgerMenu from "../Navigation/HamburgerMenu";
import LanguageSelector from "./LanguageSelector";
import useAuth from "../AppID/hooks/useAuth";

export default function Header() {
  const { auth, setAuth } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setAuth(undefined);
    navigate("/appid/logout");
    window.location.reload();
  };

  return (
    <div className="header" data-testid="component-header-div">
      <div className="items" data-testid="component-header-upper-div">
        {auth ? <HamburgerMenu /> : <div></div>}
        <Link to={"/"}>{t("app_name")}</Link>
        <div className="left-items">
          <LanguageSelector />
          {auth ? <ProfileMenu onLogoutClick={handleLogoutClick} /> : <div></div>}
        </div>
      </div>
    </div>
  );
}
