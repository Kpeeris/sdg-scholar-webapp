import Login from "@/pages/login/Login";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { login } from "../../firebase/firebaseAuth";
import { MemoryRouter } from "react-router-dom";
import { afterEach } from "vitest";
import { it, expect, describe, vi } from "vitest";

vi.mock("../../firebaseFiles/firebaseAuth", () => ({
  login: vi.fn(),
}));

describe("Login Page", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render the login page", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const loginButton = screen.getByTestId("login-button");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should login with email and password", async () => {
    //mock successful login
    login.mockResolvedValueOnce({ success: true });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const loginButton = screen.getByTestId("login-button");

    // check the correct placeholders before typing
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");

    //input email and password
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "Abcd1234" } });

    //click login button

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledTimes(1);
    });

    expect(login).toHaveBeenCalledWith("test@test.com", "Abcd1234");
  });

  it("should show error message on login failure", async () => {
    login.mockRejectedValueOnce({
      code: "auth/invalid-credential",
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const loginButton = screen.getByTestId("login-button");

    //input email and password
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    //click login button
    //screen.debug();
    fireEvent.click(loginButton);
    //screen.debug();

    await waitFor(() => {
      expect(
        screen.getByText("Your email or password is invalid. Please try again.")
      ).toBeVisible();
      //expect(screen.getByTestId("loginErrorMessage")).toBeInTheDocument();
    });
  });
});
