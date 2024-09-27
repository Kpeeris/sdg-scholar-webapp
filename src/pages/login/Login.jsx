import { TwoColumnLayout } from "../../TwoColumnLayout";

import { LoginForm } from "./components/LoginForm";
import { SignUpLink } from "./components/SignUpLink";

import { Button } from "@/components/ui/button";
import LoginSVG from "@/assets/images/Login.svg";
import { LoginButton } from "./components/LoginButton";

export const Login = () => {
  return (
    <TwoColumnLayout
      imageSrc={LoginSVG}
      imageAlt="Login SVG"
      rightContent={
        <div className="space-y-4">
          <h1>Welcome to SDG Scholar</h1>
          <p>Redefining SDG Education, One Goal at a Time</p>
          <LoginForm />
          <div className="text-right">
            <Button className="p-0" variant="link">
              Forgot Password?
            </Button>
          </div>
          <LoginButton />
          <hr className="w-full mt-4 border-gray-300" />
          <SignUpLink />
        </div>
      }
    />
  );
};

export default Login;
