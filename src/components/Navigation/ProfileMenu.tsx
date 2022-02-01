import React, { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, MenuButton, useMenuState } from "reakit/Menu";
import { useTranslation } from "react-i18next";

type ProfileMenuProps = {
  onLogoutClick: MouseEventHandler<HTMLButtonElement>;
};

export default function ProfileMenu(props: ProfileMenuProps) {
  const menu = useMenuState();
  const { t } = useTranslation("navigation");
  const navigate = useNavigate();

  const { onLogoutClick } = props;

  const handleItemClick = (path: string): void => {
    menu.hide();
    navigate(path);
  };

  return (
    <>
      <MenuButton
        {...menu}
        className="menuButton"
        data-testid="component-navigation-profilemenu-button"
        aria-label={t("profile.menubutton.aria-label")}
      >
        {t("profile.menubutton.text")}
      </MenuButton>
      <Menu {...menu} className="menu" aria-label={t("profile.menu.aria-label")}>
        <MenuItem
          {...menu}
          className="menuItem"
          aria-label={t("profile.menu.items.profile")}
          onClick={() => handleItemClick("/profile")}
        >
          {t("profile.menu.items.profile")}
        </MenuItem>
        <MenuItem
          {...menu}
          className="menuItem"
          aria-label={t("profile.menu.items.account")}
          onClick={menu.hide}
        >
          {t("profile.menu.items.account")}
        </MenuItem>
        <MenuItem
          {...menu}
          className="menuItem"
          aria-label={t("profile.menu.items.changepassword")}
          onClick={() => handleItemClick("/changepassword")}
        >
          {t("profile.menu.items.changepassword")}
        </MenuItem>
        <MenuItem
          {...menu}
          className="menuItem"
          aria-label={t("profile.menu.items.logout")}
          onClick={onLogoutClick}
        >
          {t("profile.menu.items.logout")}
        </MenuItem>
      </Menu>
    </>
  );
}
