import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { sendRequest } from "../../common/sendRequest";
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

  const getProfile = () => {
    const url = "api/v1/appid/profile";
    return sendRequest({ url: url, method: "GET" });
  };

  useEffect(() => {
    getProfile().then((response: Response) => {
      if (response.ok) {
        response.json().then((profile: UserProfile) => {
          setUserProfile(profile);
        });
      }
    });
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
