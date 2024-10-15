import { useAuthContext } from "@/AuthProvider";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { user } = useAuthContext();

  // If the user is not logged in, redirect to login
  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
