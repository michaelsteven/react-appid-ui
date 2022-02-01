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

  return (
    <pre>
      <div>Active: {String(userProfile.identities[0].idpUserInfo.active)}</div>
      <div>Status: {userProfile.identities[0].idpUserInfo.status}</div>
      <div>Created: {userProfile.identities[0].idpUserInfo.meta.created}</div>
      <div>Last Login: {userProfile.identities[0].idpUserInfo.meta.lastLogin}</div>
      <div>
        <div style={{ width: "400px" }}>
          Roles: <Multiselect options={roles} displayValue="name" selectedValues={userRoles} />
        </div>
      </div>
    </pre>
  );
}
