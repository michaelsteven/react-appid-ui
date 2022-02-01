import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserProfile } from "../model";

export function ProfilePage() {
  const emptyUser = {
    id: "",
    name: "",
    email: "",
    preferred_username: "",
    given_name: "",
    family_name: "",
    identities: [],
    attributes: {},
  };

  const { t } = useTranslation("appid");
  const [userProfile, setUserProfile] = useState<UserProfile>(emptyUser);

  useEffect(() => {
    setUserProfile(emptyUser);
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
        </div>
      </div>
    </div>
  );
}
