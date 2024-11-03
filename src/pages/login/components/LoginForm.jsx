import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Importing icons from Heroicons

export const LoginForm = ({ emailRef, passwordRef }) => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State to track password visibility

  // Toggle password visibility function
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="space-y-6 mt-4 mb-2">
      {/* Email input */}
      <div className="w-full flex flex-col items-left gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          data-testid="email"
          id="email"
          placeholder="Email"
          ref={emailRef}
        />
      </div>

      {/* Password input with show/hide functionality */}
      <div className="w-full flex flex-col items-left gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            type={passwordVisible ? "text" : "password"} // Toggle between text and password
            id="password"
            data-testid="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <button
            type="button"
            className="absolute right-0 top-0 mt-3 mr-3"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
