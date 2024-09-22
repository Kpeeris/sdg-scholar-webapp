import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const ConfirmButton = () => {
    return (
        <Link to="/signup">
             <Button className="w-full mt-6 mb-2" variant="default">Confirm</Button>
        </Link>
    );
};