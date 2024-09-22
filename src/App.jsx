import { useState } from 'react'
import './index.css'
import Layout from './Layout'
import AuthPage from './pages/UserAccounts' // added by kash

import { Route, Routes } from "react-router-dom"
import { Home, FAQ, About, Goals, Discussion, Sdg11, Quiz, Content } from './pages'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import SignUpAdmin from './pages/signup/SignUpAdmin'
import SignUpUser from './pages/signup/SignUpUserType'



function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/sdg11" element={<Sdg11 />} />
        {/*<Route path="/award" element={<Awards />}/>*/}

        <Route path="/module/:moduleId/content" element={<Content />} />
        <Route path="/module/:moduleId/quiz" element={<Quiz />} />
          
        {/* added by kash */}
        <Route path="/auth" element={<AuthPage />} /> 

        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/signupadmin" element={<SignUpAdmin />} /> 
        <Route path="/signupuser" element={<SignUpUser />} /> 

          
      </Routes>

    </Layout>
  )
}

export default App;
