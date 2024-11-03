import { useState } from "react";
import { useNavigate } from "react-router-dom"

import SignupSVG from "@/assets/images/Signup.svg";
import { TwoColumnLayout } from "../../TwoColumnLayout";
import { UserTypeCard } from "./components/UserTypeCard"; 
import { Button } from "@/components/ui/button";
import { LoginLink } from "./components/LoginLink";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export const SignUpUser = () => {
  const [userType, setUserType] = useState(null); // Track selected user type
  const [error, setError] = useState(null);

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
      setError("Please select a user type to continue.");
    }
  };

  return (
    <TwoColumnLayout
      imageSrc={SignupSVG}
      imageAlt="Signup SVG"
      rightContent={
        <div className="space-y-4">
          <div className="space-y-2 pb-2 text-center">
            <h1>Create Your Account</h1>
            <p>How are you planning to use SDG Scholar?</p>
          </div>

          {/* Pass the handleUserTypeSelection to UserTypeCard */}
          <UserTypeCard onSelectType={handleUserTypeSelection} />
          {error && (
            <Alert variant="destructive" className="flex items-center">
              <ExclamationCircleIcon className="h-5 w-5 mr-2" />
              <div>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </div>
            </Alert>
          )}

          {/* Create Account Button */}
          <div className="pt-2 pb-3">
            <Button className="w-full" variant="default" onClick={handleConfirm}>
              Create Account
            </Button>
          </div>
          
          {/* <hr className="w-full mt-4 border-white" /> */}
          <hr className="w-full mt-4 border-gray-300" />
          <LoginLink />
        </div>
      }
    />
  );
};

export default SignUpUser;

