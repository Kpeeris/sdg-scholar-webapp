import { useAuthContext } from "@/AuthProvider";
import LoadingPage from "@/components/LoadingPage";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ element, requiredRole }) => {
  const { user, role, loading } = useAuthContext();

  console.log("PrivateRoute - loading:", loading);
  console.log("PrivateRoute - user:", user);

  // loading screen
  if (loading) {
    return <LoadingPage />;
  }

  // If the user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check for required role, if provided
  if (requiredRole && role !==requiredRole) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
