import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const SignUpLink = () => {
  return (
    <div className="flex justify-center items-center">
      <p className="text-center text-base">Don't have an account?</p>
      <Link to="/signup">
        <Button className="p-2 text-base" variant="link">Sign Up Here</Button>
      </Link>
    </div>
  );
};
