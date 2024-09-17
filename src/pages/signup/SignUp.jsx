import React from "react";
import SignupSVG from '@/assets/images/Signup.svg'
import { SignUpForm } from "./components/SignUpForm"
import { SignUpButton } from "./components/SignUpButton";
import { LoginLink } from "./components/LoginLink";
import { TwoColumnLayout } from "../../TwoColumnLayout";

export const SignUp = () => {
    return (
      <TwoColumnLayout
          imageSrc={SignupSVG}
          imageAlt="Signup SVG"
  
          rightContent={
              <div className="space-y-4">
                <h1>Create Your Account</h1>
                <p>Enter your details to start creating your account</p>
                <SignUpForm />
                <SignUpButton />
                <hr className="w-full mt-4 border-gray-300" />
                <LoginLink />
              </div>
          }
      />
  
    )
  }
  
  export default SignUp;