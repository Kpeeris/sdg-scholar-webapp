import SignupSVG from "@/assets/images/Signup.svg";
import { LoginLink } from "./components/LoginLink";
import { TwoColumnLayout } from "../../TwoColumnLayout";
import { OTPForm } from "./components/OTPForm";

export const SignUpAdmin = () => {
  return (
    <TwoColumnLayout
      imageSrc={SignupSVG}
      imageAlt="Signup SVG"
      rightContent={
        <div className="space-y-4">
          <h1>Create Your Account</h1>
          <p>Enter the invite code sent to create an admin account</p>
          <OTPForm />
          <hr className="w-full mt-4 border-gray-300" />
          <LoginLink />
        </div>
      }
    />
  );
};

export default SignUpAdmin;
