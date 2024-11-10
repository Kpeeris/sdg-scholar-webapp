import { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Layout from "./layouts/Layout";

import { logout } from "../firebase/auth/firebaseAuth"; 

import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import SignUpAdmin from "./pages/signup/SignUpAdmin";
import SignUpUser from "./pages/signup/SignUpUserType";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import Home from "./pages/home/Home";
import About  from "./pages/about/About";
import Sdg11  from "./pages/sdg11/Sdg11";
import Content from "./pages/content/Content";
import Quiz from "./pages/quiz/Quiz";
import EditQuiz from "./pages/quiz/EditQuiz";
import NoticeBoard from "./pages/noticeboard/NoticeBoard";

/**
 * Main component of the app, which sets up routes and global authentication context.
 *  
 * @returns {JSX.Element} The rendered App component.
 */
function App() {

  // Handle logging out the user when the tab is closed or refreshed
  useEffect(() => {
    const handleUnload = () => {
      logout()
        .then(() => console.log("User signed out before closign the tab"))
        .catch((error) => console.error("Error logging out:", error));
    };

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {/* Public routes, accessible when not logged in */}
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route
            path="/signup"
            element={<PublicRoute element={<SignUp />} />}
          />
          <Route
            path="/signupadmin"
            element={<PublicRoute element={<SignUpAdmin />} />}
          />
          <Route
            path="/signupuser"
            element={<PublicRoute element={<SignUpUser />} />}
          />
          <Route
            path="/resetpassword"
            element={<PublicRoute element={<ResetPassword />} />}
          />

          {/* Private routes, accessible only if logged in */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/about" element={<PrivateRoute element={<About />} />} />
          <Route path="/sdg11" element={<PrivateRoute element={<Sdg11 />} />} />
          <Route
            path="/module/:moduleId/content"
            element={<PrivateRoute element={<Content />} />}
          />
          <Route
            path="/module/:moduleId/quiz"
            element={<PrivateRoute element={<Quiz />} />}
          />
          <Route
            path="/noticeboard"
            element={<PrivateRoute element={<NoticeBoard />} />}
          />

          {/* Private routes, accessible only if logged in and is an admin */}
          <Route
            path="/module/:moduleId/editquiz"
            element={
              <PrivateRoute element={<EditQuiz />} requiredRole="admin" />
            }
          />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
