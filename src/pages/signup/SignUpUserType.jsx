import { useState } from "react";
import { useNavigate } from "react-router-dom"

import SignupSVG from "@/assets/images/Signup.svg";
import { TwoColumnLayout } from "../../TwoColumnLayout";
import { UserTypeCard } from "./components/UserTypeCard"; 
import { Button } from "@/components/ui/button";
import { LoginLink } from "./components/LoginLink";

export const SignUpUser = () => {
  const [userType, setUserType] = useState(null); // Track selected user type
  const navigate = useNavigate();

  // Handle user type selection
  const handleUserTypeSelection = (type) => {
    setUserType(type);
  };

  // Handle confirmation action (e.g., navigating to next step)
  const handleConfirm = () => {
    if (userType === "admin") {
      navigate("/signupadmin", { state: { userType: "admin" } });
    } else if (userType === "learner") {
      navigate("/signup", { state: { userType: "learner" } });
    } else {
      alert("Please select a user type to continue.");
    }
  };

  return (
    <TwoColumnLayout
      imageSrc={SignupSVG}
      imageAlt="Signup SVG"
      rightContent={
        <div className="space-y-4">
          <h1>Create Your Account</h1>
          <p>How are you planning to use SDG Scholar?</p>

          {/* Pass the handleUserTypeSelection to UserTypeCard */}
          <UserTypeCard onSelectType={handleUserTypeSelection} />

          {/* Create Account Button */}
          <Button className="w-full mb-2" variant="default" onClick={handleConfirm}>
            Create Account
          </Button>
          <hr className="w-full mt-4 border-white" />
          <hr className="w-full mt-4 border-gray-300" />
          <LoginLink />
        </div>
      }
    />
  );
};

export default SignUpUser;

