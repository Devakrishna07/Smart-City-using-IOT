import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'

const App = () => {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
