import SignUp from "@/pages/signup/SignUp";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { signup } from "../../firebaseFiles/firebaseAuth";
import { doc, setDoc, serverTimestamp, getFirestore } from "firebase/firestore";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach } from "vitest";
import { it, expect, describe, vi } from "vitest";

vi.mock("../../firebaseFiles/firebaseAuth", () => ({
  signup: vi.fn(),
}));

vi.mock("firebase/firestore", () => {
  return {
    getFirestore: vi.fn(),
    doc: vi.fn(),
    setDoc: vi.fn(),
    serverTimestamp: vi.fn(),
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe("SignUp Page", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the signup page", async () => {
    useLocation.mockReturnValue({
      state: { userType: "learner" },
    });
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

  it("should successfully call login to signup learner using firebase authentication", async () => {
    //mock successful signup
    signup.mockResolvedValueOnce({ success: true });

    useLocation.mockReturnValue({
      state: { userType: "learner" },
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

    //click signup button
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith("test@test.com", "Abcd1234");
      expect(signup).toHaveBeenCalledTimes(1);
    });
  });

  it("should show error message on signup failure", async () => {
    signup.mockResolvedValueOnce({
      code: "auth/password-does-not-meet-requirements",
    });

    useLocation.mockReturnValue({
      state: { userType: "learner" },
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

  //todo test that we are saving the correct user information to the database
  it("should create a document in the database that corresponds to the new learner", async () => {
    signup.mockResolvedValueOnce({
      user: { uid: "12345", email: "learner@gmail.com" },
    });

    useLocation.mockReturnValue({
      state: { userType: "learner" },
    });
    //moch firestore document write
    setDoc.mockResolvedValueOnce();

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
    fireEvent.change(lastNameInput, { target: { value: "learner" } });
    fireEvent.change(emailInput, { target: { value: "learner@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "Pass_word123" } });

    fireEvent.click(signupButton);
    //screen.debug();

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith("learner@gmail.com", "Pass_word123");
      expect(setDoc).toHaveBeenCalledTimes(1);
      expect(setDoc).toHaveBeenCalledWith(
        doc(expect.anything(), "learners", "12345"),
        {
          email: "learner@gmail.com",
          firstName: "Test",
          lastName: "learner",
          createdAt: serverTimestamp(),
          scores: {
            sdg11t1: 0,
            sdg11t2: 0,
            sdg11t3: 0,
            sdg11t4: 0,
            sdg11t5: 0,
            sdg11t6: 0,
            sdg11t7: 0,
            sdg11t8: 0,
            sdg11t9: 0,
            sdg11t10: 0,
          },
        }
      );
    });
  });

  it("should create a document in the database that corresponds to the new admin", async () => {
    signup.mockResolvedValueOnce({
      user: { uid: "123456", email: "admin@gmail.com" },
    });

    useLocation.mockReturnValue({
      state: { userType: "admin" },
    });
    //moch firestore document write
    setDoc.mockResolvedValueOnce();

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
    fireEvent.change(lastNameInput, { target: { value: "admin" } });
    fireEvent.change(emailInput, { target: { value: "admin@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "Pass_word123" } });

    fireEvent.click(signupButton);
    //screen.debug();

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith("admin@gmail.com", "Pass_word123");
      expect(setDoc).toHaveBeenCalledTimes(1);
      expect(setDoc).toHaveBeenCalledWith(
        doc(expect.anything(), "admins", "123456"),
        {
          email: "admin@gmail.com",
          firstName: "Test",
          lastName: "admin",
          createdAt: serverTimestamp(),
        }
      );
    });
  });
});
