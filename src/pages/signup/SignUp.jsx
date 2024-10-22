import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupSVG from "@/assets/images/Signup.svg";
import { SignUpForm } from "./components/SignUpForm";
import { LoginLink } from "./components/LoginLink";
import { TwoColumnLayout } from "../../TwoColumnLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


import db from "../../../firebaseFiles/firebaseConfig.js";
import { signup } from "../../../firebaseFiles/firebaseAuth.js"; 
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const SignUp = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const { state } = useLocation(); // Get state from previous page
  const userType = state?.userType; // Extract the userType (admin or learner)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create an object to store 10 quiz scores initialized to 0 for learners
  const quizScores = {};
  for (let i = 1; i <= 10; i++) {
    quizScores[`sdg11t${i}`] = 0;
  }

  const firebaseErrorMessages = {
    "auth/user-not-found": "No user found with this email address.",
    "auth/missing-email": "An email is required to sign up. Please try again.",
    "auth/missing-password": "A password is required to sign up. Please try again.",
    "auth/invalid-email": "This email is invalid. Please try again.",
    "auth/invalid-credential": "Your email or password is invalid. Please try again.",
    "auth/password-does-not-meet-requirements": "Your password does not meet the requirements. Please try again.",
    "auth/email-already-in-use": "This email is already registered as an account. Please try a different email."
  };

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    if (!userType) {
      setError(
        <>
        Please select a user type before creating an account. 
        <Link to="/signupuser">
          <Button className="text-base p-2" variant="link">Select Here</Button>
        </Link>
        </>
      );
      setLoading(false);
      return;
    }

    if (!firstNameRef.current.value) {
      setError("A first name is required to sign up. Please try again.");
      setLoading(false);
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const firstName = firstNameRef.current.value;
      const lastName = lastNameRef.current.value;
      const email = emailRef.current.value;

      const userCredential = await signup(emailRef.current.value, passwordRef.current.value);
      const user = userCredential.user;

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
          scores: quizScores
        });
      }
      
      setLoading(false);

      navigate("/login");

    } catch (error) {
      const customErrorMessage = firebaseErrorMessages[error.code] || error.message; //error.message
      setError(customErrorMessage); 
      setLoading(false);
    }
  };

  return (
    <TwoColumnLayout
      imageSrc={SignupSVG}
      imageAlt="Signup SVG"
      rightContent={
        <div className="space-y-4">
          <div className="space-y-2 pb-4 text-center">
            <h1>Create Your Account</h1>
            <p>Enter your details to start creating your account</p>
          </div>
          
          <SignUpForm 
            firstNameRef={firstNameRef} 
            lastNameRef={lastNameRef} 
            emailRef={emailRef} 
            passwordRef={passwordRef} 
            confirmPasswordRef={confirmPasswordRef}
          />
        {error && <p className="text-red-500 text-base">{error}</p>} 
          <Button className="w-full mt-2 mb-2" variant={loading ? "secondary" : "default"} disabled={loading} onClick={handleSignup}>
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
