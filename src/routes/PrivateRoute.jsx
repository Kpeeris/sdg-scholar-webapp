import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/AuthProvider";
import LoadingPage from "@/components/LoadingPage";

/**
 * PrivateRoute component that restricts access for pages
 * based on the user's authentication status and role.
 * 
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.element - The element to render if access is granted.
 * @param {string} [props.requiredRole] - The role required to access the route (optional).
 * 
 * @returns {JSX.Element} The rendered element if access is granted, or a redirection otherwise.
 */
const PrivateRoute = ({ element, requiredRole }) => {
  const { user, role, loading } = useAuthContext();

  console.log("PrivateRoute - loading:", loading);
  console.log("PrivateRoute - user:", user);

  // Show a loading screen while authentication is being checked
  if (loading) {
    return <LoadingPage />;
  }

  // If the user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If a required role is provided and the user's role does not match, 
  // redirect to the home page
  if (requiredRole && role !==requiredRole) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
