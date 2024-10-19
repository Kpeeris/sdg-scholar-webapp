import { useAuthContext } from "@/AuthProvider";
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuthContext();

  console.log("PrivateRoute - loading:", loading);
  console.log("PrivateRoute - user:", user);

  // loading screen
  if (loading) {
    return (
      <div className="flex justify-center text-orange-500 text-3xl">
        <ArrowPathIcon className="h-12 w-12 text-orange-500 animate-spin mb-4" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // If the user is not logged in, redirect to login
  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
