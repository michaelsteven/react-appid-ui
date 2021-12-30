import React, { useEffect } from "react";
import axios from "axios";
import i18next from "i18next";

export default function ProfilePage() {
  useEffect(() => {
    //alert("made it here");

    //},[]);

    //const fetchUserProfile = ()  => async (dispatch: any) =>  {
    let response;
    try {
      //alert("made it here");
      response = axios.get(`/api/v1/user/current`, {
        headers: { "Accept-Language": i18next.language },
      });
      console.log(response);
    } catch (error) {
      console.log(response);
      console.log("fetching the current user did not execute properly.");
    }
  }, []);

  return (
    <div className="page">
      <div>
        <div>
          <div className="title">Profile Page</div>
        </div>
        <div>
          <div>No Settings available at this time</div>
        </div>
      </div>
    </div>
  );
}
