import "./index.css";
import Layout from "./Layout";

import { Route, Routes } from "react-router-dom";
import { Home, Sdg11, Quiz, Content, About } from "./index";
import { EditQuiz } from "./pages/quiz/EditQuiz";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import SignUpAdmin from "./pages/signup/SignUpAdmin";
import SignUpUser from "./pages/signup/SignUpUserType";
import NoticeBoard from "./pages/NoticeBoard";

import { useEffect } from "react"
import { logout } from "../firebaseFiles/firebaseAuth"; // Adjust the path if needed

import { AuthProvider } from "./AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault()

      logout()
        .then(()=> console.log("User signed out before closing the tab"))
        .catch((error) => console.error("Error logging out:", error))
      
      event.returnValue = ""
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  return (
    <AuthProvider>
      <Layout>
        <Routes>

          {/* Public routes */}
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
          <Route path="/signupadmin" element={<PublicRoute element={<SignUpAdmin />} />} />
          <Route path="/signupuser" element={<PublicRoute element={<SignUpUser />} />} />

          {/* Private routes, accessible only if logged in */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/about" element={<PrivateRoute element={<About />} />} />
          <Route path="/sdg11" element={<PrivateRoute element={<Sdg11 />} />} />

          <Route path="/module/:moduleId/content" element={<PrivateRoute element={<Content />} />} />
          <Route path="/module/:moduleId/quiz" element={<PrivateRoute element={<Quiz />} />} />
          <Route path="/module/:moduleId/editquiz" element={<PrivateRoute element={<EditQuiz />} />} />

          <Route path="/noticeboard" element={<PrivateRoute element={<NoticeBoard />} />} />

        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
