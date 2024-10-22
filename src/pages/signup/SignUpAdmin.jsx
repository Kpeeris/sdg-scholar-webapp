import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "../../../firebaseFiles/firebaseConfig.js";

import SignupSVG from "@/assets/images/Signup.svg";
import { Link } from "react-router-dom";
import { TwoColumnLayout } from "../../TwoColumnLayout";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; 

export const SignUpAdmin = () => {
  const adminCodeRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // State to track the visibility of the invite code
  const [codeVisible, setCodeVisible] = useState(false);

  const toggleCodeVisibility = () => {
    setCodeVisible(!codeVisible); // Toggle between visible and hidden
  };

  const verifyAdminCode = async () => {
    try {
      const codeRef = doc(db, "config/adminCodes"); // Admin codes stored in 'adminCodes' collection
      const docSnap = await getDoc(codeRef);

      const enteredCode = adminCodeRef.current.value;

      if (docSnap.exists()) {
        const docData = docSnap.data();
        if (docData && docData.code) {
          const adminCodesArray = docData.code;

          if (adminCodesArray.includes(enteredCode)) {
            navigate("/signup", { state: { userType: "admin" } });
          } else {
            setError("Invalid admin code. Please try again.");
          }
        } else {
          setError("Admin codes not found in the document.");
        }
      } else {
        setError("Admin codes document not found in the database.");
      }
    } catch (error) {
      setError("Error verifying code: " + error.message);
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
            <p>Enter the invite code sent to create an admin account</p>
          </div>

          {/* Invite Code Input with Show/Hide functionality */}
          <div className="relative pb-1">
            <Input
              type={codeVisible ? "text" : "password"} // Toggle between text and password
              id="admin-code"
              className="w-full h-12 mb-2"
              placeholder="Invite Admin Code"
              ref={adminCodeRef}
            />
            <button
              type="button"
              className="absolute right-0 top-0 mt-3 mr-3"
              onClick={toggleCodeVisibility}
            >
              {codeVisible ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {error && <p className="text-red-500 text-base">{error}</p>}
          
          {/* Verify Button */}
          <Button className="w-full mt-2 mb-2" onClick={verifyAdminCode}>
            Verify Admin Code
          </Button>

          <hr className="w-full mt-4 border-white" />
          <hr className="w-full mt-4 border-gray-300" />

          <div className="flex justify-center items-center">
            <p className="text-center text-base">Not an Admin?</p>
            <Link to="/signupuser">
              <Button className="p-2 text-base" variant="link">
                Sign Up as a Learner Here
              </Button>
            </Link>
          </div>  
        </div>
      }
    />
  );
};

export default SignUpAdmin;
