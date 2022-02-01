type Email = {
  value: string;
  primary: boolean;
};

export type Identity = {
  provider: string;
  id: string;
  idpUserInfo: {
    displayName: string;
    active: boolean;
    userName: string;
    mfaContext: {};
    emails: Array<Email>;
    meta: {
      lastLogin: string;
      created: string;
      location: string;
      lastModified: string;
      resourceType: string;
    };
    schemas: Array<string>;
    name: {
      familyName: string;
      givenName: string;
      formatted: string;
    };
    id: string;
    status: string;
    idpType: string;
  };
};

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  preferred_username: string;
  given_name: string; // first name
  family_name: string; // last name
  identities: Array<Identity>;
  attributes: {};
};
