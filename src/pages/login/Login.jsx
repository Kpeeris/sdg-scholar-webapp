
import { useRef, useState } from "react"; // Ensure these hooks are imported
import { useNavigate } from "react-router-dom";

import { TwoColumnLayout } from "../../TwoColumnLayout";

import { LoginForm } from "./components/LoginForm";
import { SignUpLink } from "./components/SignUpLink";

import { Button } from "@/components/ui/button";
import LoginSVG from "@/assets/images/Login.svg";
// import { LoginButton } from "./components/LoginButton";

import { login } from "../../../firebaseFiles/firebaseAuth.js"; // Import the logim function

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  // const currentUser = useAuth();
  
  const handleLogin = async () => {
    setLoading(true);
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      await login(email, password);

      setLoading(false);
      alert("Login successful!");
      navigate("/");

    } catch (error) {
      alert("Error during login: " + error.message);
      setLoading(false);
    }
  };

  return (
    <TwoColumnLayout
      imageSrc={LoginSVG}
      imageAlt="Login SVG"
      rightContent={
        <div className="space-y-4">
          <h1>Welcome to SDG Scholar</h1>
          <p>Redefining SDG Education, One Goal at a Time</p>
          <LoginForm emailRef={emailRef} passwordRef={passwordRef} />
          <div className="text-right">
            <Button className="p-0" variant="link">
              Forgot Password?
            </Button>
          </div>
          <Button className="w-full mt-2 mb-2" variant={loading ? "secondary" : "default"} disabled={loading} onClick={handleLogin}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
          <hr className="w-full mt-4 border-gray-300" />
          <SignUpLink />
        </div>
      }
    />
  );
};

export default Login;