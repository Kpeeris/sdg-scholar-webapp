import { useRef, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { TwoColumnLayout } from "../../layouts/TwoColumnLayout";
import { LoginForm } from "./components/LoginForm";
import { SignUpLink } from "./components/SignUpLink";
import LoginSVG from "@/assets/images/Login.svg";
import { login } from "../../../firebase/auth/firebaseAuth.js";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";

/**
 * Login component that displays a login form 
 * Handles login authentication using Firebase and provides error alerts.
 * 
 * @returns {JSX.Element} The rendered Login component.
 */
export const Login = () => {
  // Creating references for input fields
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Custom error messages for Firebase authentication errors
  const firebaseErrorMessages = {
    "auth/missing-email": "An email is required to sign up. Please try again.",
    "auth/missing-password":
      "A password is required to login. Please try again.",
    "auth/invalid-email": "This email is invalid. Please try again.",
    "auth/invalid-credential":
      "Your email or password is invalid. Please try again.",
  };

   /**
   * Handles login using Firebase authentication.
   * When successful, navigate to the home page.
   * On failure, set a custom error message.
   */
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      // Calls Firebase Authentication Login Function
      await login(email, password);

      setLoading(false);
      navigate("/"); // Navigate to Home Page
    } catch (error) {
      // Get custom error message or set as default
      const customErrorMessage =
        firebaseErrorMessages[error.code] ||
        "An unexpected error occurred. Please try again.";
      setError(customErrorMessage);
      setLoading(false);
    }
  };

  return (
    <TwoColumnLayout
      imageSrc={LoginSVG}
      imageAlt="Login SVG"

      // Right side content with login form and buttons
      rightContent={
        <div className="space-y-4">
          <div className="space-y-3 pb-2">
            <div className="space-y-3">
              <h1>Welcome to </h1>
              <div className="flex items-center flex-wrap">
                <h1>SDG Scholar</h1>
                <Icon
                  icon="streamline:global-learning"
                  width="35"
                  height="35"
                  className="ml-3 mt-1 text-orange-500"
                />
              </div>
            </div>
            <p>Redefining SDG Education, One Goal at a Time</p>
          </div>

          {/* Login Form */}
          <LoginForm emailRef={emailRef} passwordRef={passwordRef} />
          <div className="text-right">
            <Link to="/resetpassword">
              <Button className="p-2" variant="link">
                Forgot Password?
              </Button>
            </Link>
          </div>

          {/* Display Error Alert */}
          {error && (
            <Alert variant="destructive" className="flex items-center">
              <ExclamationCircleIcon className="h-5 w-5 mr-2" />
              <div>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </div>
            </Alert>
          )}

          {/* Login Button */}
          <Button
            className="w-full mt-2 mb-2"
            variant={loading ? "secondary" : "default"}
            disabled={loading}
            onClick={handleLogin}
            data-testid="login-button"
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>

          <hr className="w-full mt-4 border-white" />
          <hr className="w-full mt-4 border-gray-300" />
          <SignUpLink />
        </div>
      }
    />
  );
};

export default Login;
