import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Module from './components/pages/buttons/Module'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AuthPage from './components/pages/UserAccounts' // added by kash


import { Route, Routes } from "react-router-dom"
import { Home, FAQ, About, Goals, Discussion, Sdg11 } from './components/pages'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        {/* i dont think i need modules in here because its not going to be a seprate page with different url, it is just going to be a drop down */}
        <Route path="/goals" element={<Goals />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/sdg11" element={<Sdg11 />} />
        {/*<Route path="/award" element={<Awards />}/>*/}
        {/* added by kash */}
        <Route path="/auth" element={<AuthPage />} /> 
      </Routes>

    </>
  )
}

export default App
