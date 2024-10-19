import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const LoginLink = () => {
  return (
    <div className="flex justify-center items-center">
      <p className="text-center text-base">Already have an account?</p>
      <Link to="/login">
        <Button className="p-2 text-base" variant="link">
          Log in Here
        </Button>
      </Link>
    </div>
  );
};
