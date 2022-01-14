import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, MenuButton, useMenuState } from "reakit/Menu";
import { useTranslation } from "react-i18next";
import { containsScope } from "../AppID/common/authInfoUtils";

export default function HamburgerMenu() {
  const menu = useMenuState();
  const { t } = useTranslation("navigation");
  const navigate = useNavigate();
  const [showUserManagement, setShowUserManagement] = useState<boolean>(false);

  useEffect(() => {
    containsScope("user_management").then((result: boolean) => {
      setShowUserManagement(result);
    });
  }, []);

  const handleItemClick = (path: string): void => {
    menu.hide();
    navigate(path);
  };

  return (
    <>
      <MenuButton
        {...menu}
        className="menuButton"
        data-testid="component-navigation-hamburgermenu-div"
        aria-label={t("hamburger.menubutton.aria-label")}
      >
        <div className="hamburgerBar"></div>
        <div className="hamburgerBar"></div>
        <div className="hamburgerBar"></div>
      </MenuButton>
      <Menu {...menu} className="menu" aria-label={t("hamburger.menu.aria-label")}>
        <MenuItem
          className="menuItem"
          onClick={() => handleItemClick("/")}
          aria-label={t("hamburger.menu.items.home")}
          {...menu}
        >
          {t("hamburger.menu.items.home")}
        </MenuItem>
        <MenuItem
          className="menuItem"
          onClick={() => handleItemClick("/item1")}
          aria-label={t("hamburger.menu.items.item1")}
          {...menu}
        >
          {t("hamburger.menu.items.item1")}
        </MenuItem>
        <MenuItem
          className="menuItem"
          onClick={() => handleItemClick("/item2")}
          aria-label={t("hamburger.menu.items.item2")}
          {...menu}
        >
          {t("hamburger.menu.items.item2")}
        </MenuItem>
        <MenuItem
          className="menuItem"
          onClick={() => handleItemClick("/signup")}
          aria-label={t("hamburger.menu.items.item3")}
          {...menu}
        >
          {t("hamburger.menu.items.item3")}
        </MenuItem>
        {/* Admin Menu Item */}
        {showUserManagement ? (
          <MenuItem
            className="menuItem"
            onClick={() => handleItemClick("/usermanagement")}
            aria-label={t("hamburger.menu.items.usermanagement")}
            {...menu}
          >
            {t("hamburger.menu.items.usermanagement")}
          </MenuItem>
        ) : (
          <></>
        )}
      </Menu>
    </>
  );
}
