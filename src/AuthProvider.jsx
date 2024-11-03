// Works like a global variable, you can get access to current user, their data and role (Admin/learner)
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../firebase/firebaseAuth";

import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

const AuthContext = createContext();

// AuthProvider that wraps the app
export const AuthProvider = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // store user data
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState(null);

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
    <AuthContext.Provider
      value={{ user: currentUser, userData, role, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
