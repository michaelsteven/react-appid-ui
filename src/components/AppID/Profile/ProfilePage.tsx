import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";
import { UserProfile } from "../model";
import jwt from "jwt-decode";

export function ProfilePage() {
  const emptyUser = {
    name: "",
    email: "",
    sub: "",
    email_verified: false,
    preferred_username: "",
    given_name: "",
    family_name: "",
    identities: {
      provider: "",
      id: "",
    },
    amr: "",
  };
  const { t } = useTranslation("appid");
  const [userProfile, setUserProfile] = useState<UserProfile>(emptyUser);
  const cookies = new Cookies();

  const decodeIdentityToken = (): UserProfile => {
    const idToken = cookies.get("id_token");
    return idToken ? jwt<UserProfile>(idToken) : emptyUser;
  };

  useEffect(() => {
    const profile = decodeIdentityToken();
    setUserProfile(profile);
    // this is just temporary until we do more here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <div>
        <div>
          <div className="title">Profile Page</div>
        </div>
        <div>
          <div>
            {t("profileform.username")}: {userProfile.preferred_username}
          </div>
          <div>
            {t("profileform.firstName")}: {userProfile.given_name}{" "}
          </div>
          <div>
            {t("profileform.lastName")}: {userProfile.family_name}{" "}
          </div>
          <div>
            {t("profileform.email")}: {userProfile.email}
          </div>
          <div>
            {t("profileform.emailVerified")}: {userProfile.email_verified ? "True" : "False"}
          </div>
        </div>
      </div>
    </div>
  );
}
