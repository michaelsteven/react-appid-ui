export type UserProfile = {
  email: string;
  name: string;
  sub: string;
  email_verified: boolean;
  preferred_username: string;
  given_name: string; // first name
  family_name: string; // last name
  identities: {
    provider: string;
    id: string;
  };
  amr: string;
};
