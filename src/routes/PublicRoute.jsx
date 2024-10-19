import { useAuthContext } from "@/AuthProvider";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const { user, loading } = useAuthContext();

  console.log("PublicRoute - loading:", loading);
  console.log("PublicRoute - user:", user);

  // Show nothing while loading (you can add a loader here if you want)
  if (loading) {
    return (
      <div className="flex justify-center text-orange-500 text-3xl">
        Loading...
      </div>
    );
  }
  // If the user is logged in, redirect them to the homepage
  return user ? <Navigate to="/" /> : element;
};

export default PublicRoute;
