import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}  />
        <Route path="/signup" element={<Signup />} />
        <Route path='/dashboard' element={<Home />}  />
        <Route path='/settings' element={<Settings />}  />
        <Route path='/profile' element={<Profile />}  />
      </Routes>
    </BrowserRouter>
  )
}

export default App