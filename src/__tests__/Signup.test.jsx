import SignUp from "@/pages/signup/SignUp";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { signup } from "../../firebaseFiles/firebaseAuth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
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
    connectFirestoreEmulator: vi.fn(),
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

//helper function to render the signup page
const renderSignUp = (userType) => {
  useLocation.mockReturnValue({
    state: { userType: userType },
  });
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  );
};

//helper function to fill in the form
const fillInForm = ({ firstName, lastName, email, password }) => {
  const firstNameInput = screen.getByTestId("first-name");
  const lastNameInput = screen.getByTestId("last-name");
  const emailInput = screen.getByTestId("signup-email");
  const passwordInput = screen.getByTestId("signup-password");
  const confirmPasswordInput = screen.getByTestId("confirm-password");

  fireEvent.change(firstNameInput, { target: { value: firstName } });
  fireEvent.change(lastNameInput, { target: { value: lastName } });
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(confirmPasswordInput, { target: { value: password } });

  expect(firstNameInput.value).toBe(firstName);
  expect(lastNameInput.value).toBe(lastName);
  expect(emailInput.value).toBe(email);
  expect(passwordInput.value).toBe(password);
  expect(confirmPasswordInput.value).toBe(password);
};

describe("SignUp Page", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the signup page", async () => {
    //whether is admin or learner the page should render
    renderSignUp("learner");

    //get the important elements
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

  it("should successfully call signup to signup learner using firebase authentication", async () => {
    //mock successful signup
    signup.mockResolvedValueOnce({ success: true });

    renderSignUp("learner");

    fillInForm({
      firstName: "Test",
      lastName: "learner",
      email: "test@test.com",
      password: "Abcd1234",
    });

    const signupButton = screen.getByTestId("signup-button");

    //click signup button
    fireEvent.click(signupButton);

    //check if signup was called
    //since we are using the signup function from firebase we will assume that it works as expected
    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith("test@test.com", "Abcd1234");
      expect(signup).toHaveBeenCalledTimes(1);
    });
  });

  it("should show error message on signup failure", async () => {
    //mock failed signup and trow an error
    signup.mockRejectedValueOnce({
      code: "auth/invalid-credential",
    });

    renderSignUp("learner");

    fillInForm({
      firstName: "Test",
      lastName: "learner",
      email: "",
      password: "",
    });

    const signupButton = screen.getByTestId("signup-button");
    fireEvent.click(signupButton);
    //screen.debug();

    //check if the correct error message is displayed
    await waitFor(() => {
      expect(
        screen.getByText("Your email or password is invalid. Please try again.")
      ).toBeVisible();
    });
  });

  //test that we are saving the correct user information to the database
  it("should create a document in the database that corresponds to the new learner", async () => {
    signup.mockResolvedValueOnce({
      user: { uid: "12345", email: "learner@gmail.com" },
    });

    //mock firestore document write
    setDoc.mockResolvedValueOnce();

    renderSignUp("learner");

    fillInForm({
      firstName: "Test",
      lastName: "learner",
      email: "learner@gmail.com",
      password: "Pass_word123",
    });

    const signupButton = screen.getByTestId("signup-button");

    fireEvent.click(signupButton);
    //screen.debug();

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith("learner@gmail.com", "Pass_word123");
      expect(setDoc).toHaveBeenCalledTimes(1);
      //check that we are passing the correct data to the database
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
          sdg11FirstView: false,
        }
      );
    });
  });

  it("should create a document in the database that corresponds to the new admin", async () => {
    signup.mockResolvedValueOnce({
      user: { uid: "123456", email: "admin@gmail.com" },
    });

    setDoc.mockResolvedValueOnce();

    renderSignUp("admin");
    fillInForm({
      firstName: "Test",
      lastName: "admin",
      email: "admin@gmail.com",
      password: "Pass_word123",
    });

    const signupButton = screen.getByTestId("signup-button");

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
