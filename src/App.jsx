import "./index.css";
import Layout from "./Layout";
import AuthPage from "./pages/UserAccounts"; // added by kash

import { Route, Routes } from "react-router-dom";
import { Home, Sdg11, Quiz, Content, About } from "./index";
import { EditQuiz } from "./pages/quiz/EditQuiz";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import SignUpAdmin from "./pages/signup/SignUpAdmin";
import SignUpUser from "./pages/signup/SignUpUserType";
import NoticeBoard from "./pages/NoticeBoard";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sdg11" element={<Sdg11 />} />

        <Route path="/module/:moduleId/content" element={<Content />} />
        <Route path="/module/:moduleId/quiz" element={<Quiz />} />
        <Route path="/module/:moduleId/editquiz" element={<EditQuiz />} />
        {/* added by kash */}

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/noticeboard" element={<NoticeBoard />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupadmin" element={<SignUpAdmin />} />
        <Route path="/signupuser" element={<SignUpUser />} />
      </Routes>
    </Layout>
  );
}

export default App;
