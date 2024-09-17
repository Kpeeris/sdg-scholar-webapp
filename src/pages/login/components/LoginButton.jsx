import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const LoginButton = () => {
    return (
        <Link to="/">
             <Button className="w-full mb-2" variant="default">Log In</Button>
        </Link>
    );
};