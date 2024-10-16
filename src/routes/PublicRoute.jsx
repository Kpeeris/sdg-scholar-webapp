import { useAuthContext } from "@/AuthProvider";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const { user } = useAuthContext();

  // If the user is logged in, redirect them to the homepage
  return user ? <Navigate to="/" /> : element;
};

export default PublicRoute;
