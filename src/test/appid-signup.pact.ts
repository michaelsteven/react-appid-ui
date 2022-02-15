import { pactWith } from "jest-pact";
import { createAccount } from "../components/AppID/Signup/api";
import { HTTPMethod } from "@pact-foundation/pact/src/common/request";
import path from "path";
import { Pact } from "@pact-foundation/pact";

const account = {
  firstName: "Foo",
  lastName: "Bar",
  email: "foo@bar.com",
  password: "dummyvalue",
};

// Setup Pact
const pact = new Pact({
  host: "localhost",
  cors: true,
  port: 3005,
  logLevel: "debug",
  log: path.resolve(process.cwd(), "pact/logs", "pact.log"),
  dir: path.resolve(process.cwd(), "pact/pacts"),
  consumer: "react-appid-ui",
  provider: "react-api",
});

beforeAll(async () => {
  jest.setTimeout(20000);
  await pact.setup();
}, 30000);

afterAll(() => {
  pact.finalize();
});

export const signupResponse = {
  status: 200,
  headers: {
    "Content-Type": "application/json",
  },
  body: {
    displayName: "Foo Bar",
    active: true,
    userName: "foo@bar.com",
    emails: [
      {
        value: "foo@bar.com",
        primary: true,
      },
    ],
    meta: {
      created: "2022-02-14T15:52:38.270Z",
      location:
        "/v1/9cf5a673-2538-4309-b7ef-f6633ed8c87c/Users/ad8433ab-1df8-466b-bf99-94c05fc3e781",
      lastModified: "2022-02-14T15:52:38.270Z",
      resourceType: "User",
    },
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    name: {
      familyName: "Bar",
      givenName: "Foo",
      formatted: "Foo Bar",
    },
    id: "ad8433ab-1df8-466b-bf99-94c05fc3e781",
    status: "PENDING",
  },
};

pactWith({ consumer: "react-appid-ui", provider: "react-api" }, (provider) => {
  describe("Signup Endpoint", () => {
    beforeEach(() => {
      const interaction = {
        state: "I have an account object",
        uponReceiving: "a post request to create an account",
        withRequest: {
          method: HTTPMethod.POST,
          path: "/api/v1/appid/signup",
          headers: {
            Accept: "application/json",
          },
          body: account,
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: signupResponse,
        },
      };
      return provider.addInteraction(interaction);
    });

    it("returns the correct response", () => {
      createAccount(provider.mockService.baseUrl, account).then((response: any) => {
        expect(response.data.status).toEqual(signupResponse.status);
        expect(response.data.headers).toEqual(signupResponse.headers);
        expect(response.data.body).toEqual(signupResponse.body);
      });
    });
  });
});
