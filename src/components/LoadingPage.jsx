import React from "react";
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const LoadingPage = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
        <div className="flex flex-col items-center">
            <ArrowPathIcon className="h-12 w-12 text-orange-500 animate-spin mb-4" />
            <p className="text-orange-500 text-3xl">{message}</p>
        </div>
  </div>
  );
};

export default LoadingPage;
