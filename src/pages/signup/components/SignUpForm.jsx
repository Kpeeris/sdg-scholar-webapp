import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; 

export const SignUpForm = ({ firstNameRef, lastNameRef, emailRef, passwordRef }) => {
  const [passwordVisible, setPasswordVisible] = useState(false); // Track password visibility

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle visibility state
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center items-center space-x-5">
        <div className="w-full flex flex-col items-left gap-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input type="text" id="first-name" placeholder="First Name" ref={firstNameRef} />
        </div>

        <div className="w-full flex flex-col items-left gap-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input type="text" id="last-name" placeholder="Last Name" ref={lastNameRef} />
        </div>
      </div>

      <div className="w-full flex flex-col items-left gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" ref={emailRef} />
      </div>

      <div className="space-y-3">
        <div className="w-full flex flex-col items-left gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              type={passwordVisible ? "text" : "password"} // Toggle between text and password
              id="password"
              placeholder="Password"
              ref={passwordRef}
            />

            {/* Eye Icon Button to toggle visibility */}
            <button
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
          <li>At least 1 number and special character</li>
        </ul>
      </div>
    </div>
  );
};
