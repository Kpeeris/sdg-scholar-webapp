import { useAuthContext } from "@/AuthProvider";
import LoadingPage from "@/components/LoadingPage";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const { user, loading } = useAuthContext();

  console.log("PublicRoute - loading:", loading);
  console.log("PublicRoute - user:", user);

  // loading screen
  if (loading) {
    return <LoadingPage />;
  }
  // If the user is logged in, redirect them to the homepage
  return user ? <Navigate to="/" /> : element;
};

export default PublicRoute;
