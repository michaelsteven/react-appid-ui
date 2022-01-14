import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import HamburgerMenu from "./HamburgerMenu";
import { BrowserRouter } from "react-router-dom";

//jest.mock("containsScope");

const mockContainsScope = jest.fn().mockName("containsScope");
//const mockContainsScope = containsScope as jest.Mocked<typeof containsScope>;
// const mockContainsScope3 = containsScope as jest.Mocked<typeof containsScope>;
//const mockContainsScope2 = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)));
const mockContainsScope4 = jest.fn(() => true);
mockContainsScope.mockImplementation((scope) => {
  return new Promise((resolve) => {
    resolve(mockContainsScope4);
  });
});
/*
jest.mock(
  "../AppID/common/tokenUtils",
  () =>
    new Promise((resolve) =>
      resolve({
        containsScope: () => Promise.resolve(true),
      })
    )
);
*/
describe("HamburgerMenu", () => {
  test("renders home menu item", async () => {
    render(
      <BrowserRouter>
        <HamburgerMenu />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
    });
  });

  test("renders user management menu item when the user has the user_management scope", async () => {
    render(
      <BrowserRouter>
        <HamburgerMenu />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("User Management")).toBeInTheDocument();
    });
  });
});
