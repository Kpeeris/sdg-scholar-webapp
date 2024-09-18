import React from "react";
import SignupSVG from '@/assets/images/Signup.svg'

import { TwoColumnLayout } from "../../TwoColumnLayout"
import { ConfirmButton } from "./components/ConfirmButton";
import { UserTypeCard } from "./components/UserTypeCard";

export const SignUpUser = () => {
    return (
      <TwoColumnLayout
          imageSrc={SignupSVG}
          imageAlt="Signup SVG"
  
          rightContent={
              <div className="space-y-4">
                <h1>Create Your Account</h1>
                <p>How are you planning to use SDG Scholar?</p>
                <UserTypeCard />
                <ConfirmButton />
              </div>
          }
      />
  
    )
  }
  
  export default SignUpUser;