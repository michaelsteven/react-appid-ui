import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { sendRequest } from "../../common/sendRequest";
import { Role, UserProfile } from "../model";
import { Multiselect } from "multiselect-react-dropdown";

type ExpandedUserProps = {
  userProfile: UserProfile;
  roles: Array<Role>;
};

export function ExpandedUser(props: ExpandedUserProps) {
  const { t } = useTranslation("appid");
  const { userProfile, roles } = props;
  const [userRoles, setUserRoles] = useState<Array<Role>>([]);

  const getUserRoles = (userId: string) => {
    const url = `api/v1/appid/users/${userId}/roles`;
    return sendRequest({ url: url, method: "GET" });
  };

  const putUserRoles = (userId: string, roleIds: Array<string>) => {
    const url = `api/v1/appid/users/${userId}/roles`;
    return sendRequest({ url: url, method: "PUT", body: JSON.stringify({ roles: roleIds }) });
  };

  useEffect(() => {
    if (userProfile.id) {
      getUserRoles(userProfile.id).then((response: Response) => {
        if (response.ok) {
          response.json().then((payload: { roles: Array<Role> }) => {
            setUserRoles(payload.roles);
          });
        }
      });
    }
  }, [userProfile]);

  const onRolesChanged = (selectedList: Array<Role>, _selectedItem: Role) => {
    const roleIds = selectedList.map((role: Role) => {
      return role.id;
    });
    putUserRoles(userProfile.id, roleIds);
  };

  return (
    <pre>
      <div>
        {t("usermanagement.id")}: {userProfile.identities[0].idpUserInfo.id}
      </div>
      <div>
        {t("usermanagement.status")}: {userProfile.identities[0].idpUserInfo.status}
      </div>
      <div>
        {t("usermanagement.active")}:{" "}
        {userProfile.identities[0].idpUserInfo.active
          ? t("usermanagement.true")
          : t("usermanagement.false")}
      </div>
      <div>
        {t("usermanagement.created")}: {userProfile.identities[0].idpUserInfo.meta.created}
      </div>
      <div>
        {t("usermanagement.last_login")}: {userProfile.identities[0].idpUserInfo.meta.lastLogin}
      </div>
      <div>
        <div style={{ width: "400px" }}>
          {t("usermanagement.roles")}:{" "}
          <Multiselect
            options={roles}
            displayValue="name"
            selectedValues={userRoles}
            onSelect={onRolesChanged}
            onRemove={onRolesChanged}
          />
        </div>
      </div>
    </pre>
  );
}
