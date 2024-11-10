import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * Login Link component displays a login link with a message
 * 
 * @returns {JSX.Element} The rendered LoginLink component.
 */
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
