import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const SignUpButton = () => {
    return (
        <Link to="/">
             <Button className="w-full mt-4 mb-2" variant="default">Sign Up</Button>
        </Link>
    );
};