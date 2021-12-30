import React from "react";
import { render } from "@testing-library/react";
import SignupForm from "./SignupForm";

const defaultProps = { onSubmit: () => {} };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return render(<SignupForm {...setupProps} />);
};

test("renders the expected component without error", () => {
  const { getByTestId } = setup({ onSubmit: () => {} });
  const accountForm = getByTestId("component-signuppage-signupform-div");
  expect(accountForm).toBeInTheDocument();
});
