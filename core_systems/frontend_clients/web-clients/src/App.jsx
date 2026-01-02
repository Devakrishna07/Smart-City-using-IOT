import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
    <div className='overflow-y-hidden'>
      <Routes>
        <Route path='/' element={<Login />}  />
        <Route path="/signup" element={<Signup />} />
        <Route path='/home' element={<Home />}  />

      </Routes>
    </div>
     
    </BrowserRouter>
  )
}

export default App
