// SIGN UP FORM 

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";

export const SignUpForm = forwardRef(({ firstNameRef, lastNameRef, emailRef, passwordRef }, ref) => {
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
          <Input type="password" id="password" placeholder="Password" ref={passwordRef} />
        </div>
        <ul className="text-sm">
          <li>Minimum length of 6 characters</li>
          <li>Has uppercase and lowercase letters </li>
          <li>At least 1 number or special character</li>
        </ul>
      </div>
    </div>
  );
});

SignUpForm.displayName = "SignUpForm";