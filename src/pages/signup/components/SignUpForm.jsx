import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

/**
 * SignUpForm component for getting user data like first name, last name, email, and password.
 * 
 * @param {Object} props - The props for the SignUpForm component.
 * @param {React.Ref} props.firstNameRef - Reference to the first name input element.
 * @param {React.Ref} props.lastNameRef - Reference to the last name input element.
 * @param {React.Ref} props.emailRef - Reference to the email input element.
 * @param {React.Ref} props.passwordRef - Reference to the password input element.
 * @param {React.Ref} props.confirmPasswordRef - Reference to the confirm password input element.
 * 
 * @returns {JSX.Element} The rendered SignUpForm component.
 */
export const SignUpForm = ({
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef,
  confirmPasswordRef,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // Toggle password visibility function
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

    // Toggle confirm password visibility function
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="space-y-6">
      {/* First name and last name input fields */}
      <div className="flex justify-center items-center space-x-5">
        <div className="w-full flex flex-col items-left gap-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input
            data-testid="first-name"
            type="text"
            id="first-name"
            placeholder="First Name"
            ref={firstNameRef}
          />
        </div>
        <div className="w-full flex flex-col items-left gap-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input
            data-testid="last-name"
            type="text"
            id="last-name"
            placeholder="Last Name"
            ref={lastNameRef}
          />
        </div>
      </div>

      {/* Email input field */}
      <div className="w-full flex flex-col items-left gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          data-testid="signup-email"
          type="email"
          id="email"
          placeholder="Email"
          ref={emailRef}
        />
      </div>

      {/* Password and password rules div */}
      <div className="space-y-3">
        <div className="w-full flex flex-col items-left gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              data-testid="signup-password"
              type={passwordVisible ? "text" : "password"} // Toggle between text and password
              id="password"
              placeholder="Password"
              ref={passwordRef}
            />

            {/* Eye Icon Button to toggle visibility */}
            <button
              data-testid="toggle-password-visibility"
              type="button"
              className="absolute right-0 top-0 mt-3 mr-3"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <ul className="text-sm">
          <li>Minimum length of 8 characters</li>
          <li>Has uppercase and lowercase letters </li>
          <li>At least 1 number and 1 special character</li>
        </ul>
      </div>

      {/* Confirm password div */}
      <div className="w-full flex flex-col items-left gap-2 pb-4">
        <Label htmlFor="password">Confirm Password</Label>
        <div className="relative">
          <Input
            data-testid="confirm-password"
            type={confirmPasswordVisible ? "text" : "password"} // Toggle between text and password
            id="confirm-password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />

          {/* Eye Icon Button to toggle visibility */}
          <button
            type="button"
            className="absolute right-0 top-0 mt-3 mr-3"
            onClick={toggleConfirmPasswordVisibility}
          >
            {confirmPasswordVisible ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
