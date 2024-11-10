import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../firebase/auth/firebaseAuth";

import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

const AuthContext = createContext();

/**
 * AuthProvider component that wraps the app and provides access
 * based on current user's authentication state, user data, and role.
 * Fetches user data from Firestore to determine whether the user is a learner or admin.
 * 
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The child components wrapped by the AuthProvider.
 * 
 * @returns {JSX.Element} The AuthContext.Provider component wrapping the children.
 */
export const AuthProvider = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // store user data
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState(null);

  // Fetch user's role and data when current user changes
  useEffect(() => {
    if (currentUser) {
      const fetchUserRole = async () => {
        try {
          // Try fetching learner document
          const learnerDoc = await getDoc(doc(db, "learners", currentUser.uid));
          if (learnerDoc.exists()) {
            setUserData(learnerDoc.data());
            setRole("learner");
            return;
          }

          // If not a learner, try fetching admin document
          const adminDoc = await getDoc(doc(db, "admins", currentUser.uid));
          if (adminDoc.exists()) {
            setUserData(adminDoc.data());
            setRole("admin");
            return;
          }

          // If neither learner nor admin, clear data
          setUserData(null);
          setRole(null);
        } catch (error) {
          console.error("Error fetching user role: ", error);
          // Optionally clear data on error
          setUserData(null);
          setRole(null);
        }
      };
      fetchUserRole();
    } else {
      // Reset user data and role when no user is logged in (after logout)
      setUserData(null);
      setRole(null);
    }
  }, [currentUser]);

  return (
    // Providing user, userData, role, and loading state to entire app
    <AuthContext.Provider
      value={{ user: currentUser, userData, role, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
