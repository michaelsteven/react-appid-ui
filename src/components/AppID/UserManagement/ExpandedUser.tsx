import React, { useEffect, useState } from "react";
import { sendRequest } from "../../common/sendRequest";
import { Role, UserProfile } from "../model";
import { Multiselect } from "multiselect-react-dropdown";

type ExpandedUserProps = {
  userProfile: UserProfile;
  roles: Array<Role>;
};

export function ExpandedUser(props: ExpandedUserProps) {
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

  const onSelect = (selectedList: Array<Role>, selectedItem: Role) => {
    const roleIds = selectedList.map((role: Role) => {
      return role.id;
    });
    putUserRoles(userProfile.id, roleIds);
    alert(`in onSelect: ${JSON.stringify(roleIds)}`);
  };

  const onRemove = (selectedList: Array<Role>, removedItem: Role) => {
    const roleIds = selectedList.map((role: Role) => {
      return role.id;
    });
    putUserRoles(userProfile.id, roleIds);
    alert(`onRemove: ${JSON.stringify(roleIds)}`);
  };

  return (
    <pre>
      <div>ID: {userProfile.identities[0].idpUserInfo.id}</div>
      <div>Status: {userProfile.identities[0].idpUserInfo.status}</div>
      <div>Active: {String(userProfile.identities[0].idpUserInfo.active)}</div>
      <div>Created: {userProfile.identities[0].idpUserInfo.meta.created}</div>
      <div>Last Login: {userProfile.identities[0].idpUserInfo.meta.lastLogin}</div>
      <div>
        <div style={{ width: "400px" }}>
          Roles:{" "}
          <Multiselect
            options={roles}
            displayValue="name"
            selectedValues={userRoles}
            onSelect={onSelect}
            onRemove={onRemove}
          />
        </div>
      </div>
    </pre>
  );
}
