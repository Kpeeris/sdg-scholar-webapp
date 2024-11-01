import { useAuthContext } from "@/AuthProvider";
import LoadingPage from "@/components/LoadingPage";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuthContext();

  console.log("PrivateRoute - loading:", loading);
  console.log("PrivateRoute - user:", user);

  // loading screen
  if (loading) {
    return <LoadingPage />;
  }

  // If the user is not logged in, redirect to login
  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
