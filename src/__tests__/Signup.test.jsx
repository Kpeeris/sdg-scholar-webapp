import SignUp from "@/pages/signup/SignUp";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { signup } from "../../firebaseFiles/firebaseAuth";
import { MemoryRouter } from "react-router-dom";
import { afterEach } from "vitest";
import { it, expect, describe, vi } from "vitest";

vi.mock("../../firebaseFiles/firebaseAuth", () => ({
  signup: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({
      state: { userType: "learner" }, // Mock userType as learner
    }),
  };
});

describe("SignUp Page", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the signup page", async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    //get all the important parts of the page
    const firstNameInput = screen.getByTestId("first-name");
    const lastNameInput = screen.getByTestId("last-name");
    const emailInput = screen.getByTestId("signup-email");
    const passwordInput = screen.getByTestId("signup-password");
    const signupButton = screen.getByTestId("signup-button");

    //do they exist?
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  it("should signup Learner successfully", async () => {
    //mock successful signup
    signup.mockResolvedValueOnce({ success: true });

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const firstNameInput = screen.getByTestId("first-name");
    const lastNameInput = screen.getByTestId("last-name");
    const emailInput = screen.getByTestId("signup-email");
    const passwordInput = screen.getByTestId("signup-password");
    const signupButton = screen.getByTestId("signup-button");

    expect(firstNameInput.value).toBe("");
    expect(lastNameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");

    //input all the fields
    fireEvent.change(firstNameInput, { target: { value: "Test" } });
    fireEvent.change(lastNameInput, { target: { value: "Admin" } });
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "Abcd1234" } });

    //check that the fields have been filled
    expect(firstNameInput.value).toBe("Test");
    expect(lastNameInput.value).toBe("Admin");
    expect(emailInput.value).toBe("test@test.com");
    expect(passwordInput.value).toBe("Abcd1234");

    // console.log("before click");
    // screen.debug();
    //click signup button
    fireEvent.click(signupButton);
    // console.log("after click");
    // screen.debug();

    await waitFor(() => {
      expect(signup).toHaveBeenCalledTimes(1);
    });

    expect(signup).toHaveBeenCalledWith("test@test.com", "Abcd1234");
  });

  it("should show error message on signup failure", async () => {
    signup.mockResolvedValueOnce({
      code: "auth/password-does-not-meet-requirements",
    });
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const firstNameInput = screen.getByTestId("first-name");
    const lastNameInput = screen.getByTestId("last-name");
    const emailInput = screen.getByTestId("signup-email");
    const passwordInput = screen.getByTestId("signup-password");
    const signupButton = screen.getByTestId("signup-button");

    fireEvent.change(firstNameInput, { target: { value: "Test" } });
    fireEvent.change(lastNameInput, { target: { value: "Admin" } });
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    fireEvent.click(signupButton);
    //screen.debug();

    await waitFor(() => {
      expect(screen.getByTestId("signupErrorMessage")).toBeInTheDocument();
    });
  });
});
