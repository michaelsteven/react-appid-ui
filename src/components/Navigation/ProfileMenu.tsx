import React, { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, MenuButton, useMenuState } from "reakit/Menu";
import { useTranslation } from "react-i18next";
import { sendRequest } from "../common/sendRequest";

type ProfileMenuProps = {
  onLogoutClick: MouseEventHandler<HTMLButtonElement>;
};

export default function ProfileMenu(props: ProfileMenuProps) {
  const menu = useMenuState();
  const { t } = useTranslation("navigation");
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string>();

  const { onLogoutClick } = props;

  const handleItemClick = (path: string): void => {
    menu.hide();
    navigate(path);
  };

  const getAvatar = () => {
    const url = "/api/v1/appid/profile/avatar/thumbnail";
    return sendRequest({ url: url, method: "GET" });
  };

  useEffect(() => {
    getAvatar().then((response: Response) => {
      response.arrayBuffer().then((arrayBuffer: ArrayBuffer) => {
        const mediaSource = URL.createObjectURL(new Blob([arrayBuffer]));
        setAvatar(mediaSource);
      });
    });
  }, []);

  return (
    <>
      <MenuButton
        {...menu}
        className="menuButton"
        data-testid="component-navigation-profilemenu-button"
        aria-label={t("profile.menubutton.aria-label")}
      >
        {avatar && avatar.length > 1000 ? (
          <img src={avatar} alt="" />
        ) : (
          <img src="/assets/icons/icon-profile.svg" alt="" />
        )}
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
