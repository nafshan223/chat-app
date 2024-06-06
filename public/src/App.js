import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'
import Welcome from './components/Welcome'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import EmailVerify from './components/EmailVerify'
import Otpverification from './pages/Otpverification'


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/welcome" element={<Welcome/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/ResetPassword/:id" element={<ResetPassword/>}/>
      <Route path="/setAvatar" element={<SetAvatar/>}/>
      <Route path="/otp" element={<Otpverification/>}/>

      <Route path="/" element={<Chat/>}/>
    </Routes>
    </BrowserRouter>
    

    )
}

export default App
