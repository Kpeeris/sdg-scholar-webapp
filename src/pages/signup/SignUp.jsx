// sign up jsx

import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupSVG from "@/assets/images/Signup.svg";
import { SignUpForm } from "./components/SignUpForm";
import { LoginLink } from "./components/LoginLink";
import { TwoColumnLayout } from "../../TwoColumnLayout";
import { Button } from "@/components/ui/button";

import db from "../../../firebaseFiles/firebaseConfig.js";
import { signup, useAuth } from "../../../firebaseFiles/firebaseAuth.js"; // Import the signup function
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const SignUp = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const currentUser = useAuth();
  const navigate = useNavigate();

  const { state } = useLocation(); // Get state from previous page
  const userType = state?.userType; // Extract the userType (admin or learner)

  const [loading, setLoading] = useState(false);

  // Create an object to store 10 quiz scores initialized to 0
  const quizScores = {};
  for (let i = 1; i <= 10; i++) {
    quizScores[`sdgt11${i}`] = 0;
  }

  const handleSignup = async () => {
    setLoading(true);
    try {
      const firstName = firstNameRef.current.value;
      const lastName = lastNameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

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

      alert("User signed up and data saved in Firestore ");
      navigate("/login");

    } catch (error) {
      alert("Error during sign up: " + error.message);
      setLoading(false);
    }
  };

  return (
    <TwoColumnLayout
      imageSrc={SignupSVG}
      imageAlt="Signup SVG"
      rightContent={
        <div className="space-y-4">
          <h1>Create Your Account</h1>
          <p>Enter your details to start creating your account</p>
          <SignUpForm 
            firstNameRef={firstNameRef} 
            lastNameRef={lastNameRef} 
            emailRef={emailRef} 
            passwordRef={passwordRef} 
          />
          <Button className="w-full mt-2 mb-2" variant={loading ? "secondary" : "default"} disabled={loading} onClick={handleSignup}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
          <hr className="w-full mt-4 border-gray-300" />
          <LoginLink />
        </div>
      }
    />
  );
};

export default SignUp;
