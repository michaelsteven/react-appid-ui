import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";
import ProfileMenu from "../Navigation/ProfileMenu";
import HamburgerMenu from "../Navigation/HamburgerMenu";

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogoutClick = () => {
    cookies.remove("refresh_token");
    cookies.remove("id_token");
    cookies.remove("auth_token");
    navigate("/appid/logout");
    window.location.reload();
  };

  const idToken = cookies.get("id_token");

  return (
    <div className="header" data-testid="component-header-div">
      <div className="items" data-testid="component-header-upper-div">
        <HamburgerMenu />
        <Link to={"/"}>{t("app_name")}</Link>
        {idToken ? <ProfileMenu onLogoutClick={handleLogoutClick} /> : <div></div>}
      </div>
    </div>
  );
}
