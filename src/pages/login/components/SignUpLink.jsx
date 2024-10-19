import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const SignUpLink = () => {
  return (
    <div className="flex justify-center items-center mt-2">
      {/* replaced ' (apostorphy) with &apos; because of react/no-unescaped-entities error*/}
      <p className="text-center text-base">Don&apos;t have an account?</p>
      <Link to="/signupuser">
        <Button className="p-2 text-base" variant="link">
          Sign Up Here
        </Button>
      </Link>
    </div>
  );
};
