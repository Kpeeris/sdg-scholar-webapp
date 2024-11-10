import { useState, useRef } from "react";
// eslint-disable-next-line
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import db from "../../../firebase/firebaseConfig.js";
import { signup } from "../../../firebase/auth/firebaseAuth.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import SignupSVG from "@/assets/images/Signup.svg";
import { SignUpForm } from "./components/SignUpForm";
import { LoginLink } from "./components/LoginLink";
import { TwoColumnLayout } from "../../layouts/TwoColumnLayout";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

/**
 * SignUp component for user registration.
 * Collects user details, validates input, and writes user data to
 * Firestore based on user role.
 *
 * @returns {JSX.Element} The rendered SignUp component.
 */
const SignUp = () => {
  // Creating references for input fields
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  //const navigate = useNavigate();

  const { state } = useLocation(); // Get state from previous page
  const userType = state?.userType; // Extract the userType (admin or learner)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create an object to store 10 quiz scores initialized to 0 for learners
  const quizScores = {};
  for (let i = 1; i <= 10; i++) {
    quizScores[`sdg11t${i}`] = 0;
  }

  // Custom error messages
  const firebaseErrorMessages = {
    "auth/missing-email": "An email is required to sign up. Please try again.",
    "auth/missing-password":
      "A password is required to sign up. Please try again.",
    "auth/invalid-email": "This email is invalid. Please try again.",
    "auth/invalid-credential":
      "Your email or password is invalid. Please try again.",
    "auth/password-does-not-meet-requirements":
      "Your password does not meet the requirements. Please try again.",
    "auth/email-already-in-use":
      "This email is already registered as an account. Please try a different email.",
  };

  /**
   * Handles the signup process using Firebase Auth sign up function
   * Validates input, signs up the user, and writes user data to Firestore.
   */
  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    // Check if the user type is selected
    if (!userType) {
      setError(
        <>
          Please select a user type before creating an account.
          <Link to="/signupuser">
            <Button className="text-base p-2" variant="link">
              Select Here
            </Button>
          </Link>
        </>
      );
      setLoading(false);
      return;
    }

    // Validate if the first name field is filled
    if (!firstNameRef.current.value) {
      setError("A first name is required to sign up. Please try again.");
      setLoading(false);
      return;
    }

    // Check if the passwords match for confirm password
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const firstName = firstNameRef.current.value;
      const lastName = lastNameRef.current.value;
      const email = emailRef.current.value;

      // Sign up the user with Firebase authentication
      const userCredential = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      const user = userCredential.user;

      // Write user data to Firestore based on user role
      if (userType === "admin") {
        // Writes to the admins database based on form input
        await setDoc(doc(db, "admins", user.uid), {
          email,
          firstName,
          lastName,
          createdAt: serverTimestamp(),
        });
      } else if (userType === "learner") {
        // Writes to the learners database based on form input
        await setDoc(doc(db, "learners", user.uid), {
          email,
          firstName,
          lastName,
          createdAt: serverTimestamp(),
          scores: quizScores, // Initialize quiz scores for learners
          sdg11FirstView: false, // Track if learner has viewed SDG 11
        });
      }

      setLoading(false);
    } catch (error) {
      const customErrorMessage =
        firebaseErrorMessages[error.code] || error.message;
      setError(customErrorMessage);
      setLoading(false);
    }
  };

  return (
    <TwoColumnLayout
      imageSrc={SignupSVG}
      imageAlt="Signup SVG"
      // Right side content with sign up form and buttons
      rightContent={
        <div className="space-y-4">
          <div className="space-y-2 pb-4 text-center">
            <h1>Create Your Account</h1>
            <p>Enter your details to start creating your account</p>
          </div>

          {/* Sign up Form */}
          <SignUpForm
            firstNameRef={firstNameRef}
            lastNameRef={lastNameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            confirmPasswordRef={confirmPasswordRef}
          />

          {/* Display error alert */}
          {error && (
            <Alert variant="destructive" className="flex items-center">
              <ExclamationCircleIcon className="h-5 w-5 mr-2" />
              <div>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </div>
            </Alert>
          )}

          {/* Sign up button */}
          <Button
            data-testid="signup-button"
            className="w-full mt-2 mb-2"
            variant={loading ? "secondary" : "default"}
            disabled={loading}
            onClick={handleSignup}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>

          <hr className="w-full mt-4 border-white" />
          <hr className="w-full mt-4 border-gray-300" />
          <LoginLink />
        </div>
      }
    />
  );
};

export default SignUp;
