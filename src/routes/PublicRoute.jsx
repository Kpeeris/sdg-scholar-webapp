import { useAuthContext } from "@/AuthProvider";
import LoadingPage from "@/components/LoadingPage";
import { Navigate } from "react-router-dom";

/**
 * PublicRoute component that restricts access for pages
 * for authenticated users.
 * 
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.element - The element to render if the user is not logged in.
 * 
 * @returns {JSX.Element} The loading page, a redirection, or the requested element.
 */
const PublicRoute = ({ element }) => {
  const { user, loading } = useAuthContext();

  console.log("PublicRoute - loading:", loading);
  console.log("PublicRoute - user:", user);

  // Show a loading screen while authentication status is being checked
  if (loading) {
    return <LoadingPage />;
  }
  
  // If the user is logged in, redirect them to the homepage
  return user ? <Navigate to="/" /> : element;
};

export default PublicRoute;
