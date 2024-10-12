// import SignupSVG from "@/assets/images/Signup.svg";

// import { TwoColumnLayout } from "../../TwoColumnLayout";
// import { ConfirmButton } from "./components/ConfirmButton";
// import { UserTypeCard } from "./components/UserTypeCard";

// export const SignUpUser = () => {
//   return (
//     <TwoColumnLayout
//       imageSrc={SignupSVG}
//       imageAlt="Signup SVG"
//       rightContent={
//         <div className="space-y-4">
//           <h1>Create Your Account</h1>
//           <p>How are you planning to use SDG Scholar?</p>
//           <UserTypeCard />
//           <ConfirmButton />
//         </div>
//       }
//     />
//   );
// };

// export default SignUpUser;


// SIGN UP USER TYPE
import { useState } from "react";
import { useNavigate } from "react-router-dom"

import SignupSVG from "@/assets/images/Signup.svg";
import { TwoColumnLayout } from "../../TwoColumnLayout";
import { UserTypeCard } from "./components/UserTypeCard"; 
import { Button } from "@/components/ui/button";

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
      // Navigate to Admin Code Verification page or show the verification component
      alert("Proceeding to Admin Code Verification...");
      //navigate("/signupadmin");
      navigate("/signup", { state: { userType: "admin" } });
    } else if (userType === "learner") {
      // Navigate to Learner Sign-Up Form or show the form component
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
          <Button className="w-full mt-6 mb-2" variant="default" onClick={handleConfirm}>
            Create Account
          </Button>
        </div>
      }
    />
  );
};

export default SignUpUser;

