import { useRef, useState } from "react";
import { resetPassword } from "../../firebase/auth/firebaseAuth";

import ForgotPasswordSVG from "@/assets/images/Forgotpassword.svg";
import { LoginLink } from "./signup/components/LoginLink";
import { TwoColumnLayout } from "../layouts/TwoColumnLayout";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

/**
 * ResetPassword component for handling password reset requests.
 * Collects user's email and sends a reset email link
 *
 * @returns {JSX.Element} The rendered ResetPassword component.
 */
const ResetPassword = () => {
  const emailRef = useRef(); // Reference to the email input field

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  // Custom error messages
  const firebaseErrorMessages = {
    "auth/invalid-email": "The email is invalid. Please try again.",
    "auth/missing-email":
      "An email is needed to reset your password. Please try again",
  };

  /**
   * Handles sending the password reset email.
   * Validates email input and calls the resetPassword Firebase function
   */
  const handleResetPassword = async () => {
    setLoading(true);
    setMessage("");
    setError(null);

    try {
      const email = emailRef.current.value;

      // Call the resetPassword function from Firebase
      await resetPassword(email);

      // Set success message
      setMessage(
        "A password reset link has been sent to your email if you have previously signed up for SDG Scholar."
      );
    } catch (error) {
      const customErrorMessage =
        firebaseErrorMessages[error.code] ||
        "Failed to send reset email. Please try again.";
      setError(customErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TwoColumnLayout
      imageSrc={ForgotPasswordSVG}
      imageAlt="Forgot Password SVG"
      rightContent={
        <div className="space-y-4">
          <div className="space-y-2 pb-2 text-center">
            <h1>Forgot Password?</h1>
            <p>Enter your email to receive a password reset link</p>
          </div>

          {/* Email input field */}
          <div className="w-full flex flex-col items-left gap-2 pb-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" ref={emailRef} />
          </div>

          {/* Success message */}
          {message && <p className="text-green-600 text-base">{message}</p>}

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

          {/* Reset password button */}
          <Button
            className="w-full mt-2 mb-2"
            variant={loading ? "secondary" : "default"}
            disabled={loading}
            onClick={handleResetPassword}
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </Button>

          <hr className="w-full mt-4 border-white" />
          <hr className="w-full mt-4 border-gray-300" />
          <LoginLink />
        </div>
      }
    />
  );
};

export default ResetPassword;
