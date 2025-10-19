import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import LiveFeed from './pages/LiveFeed';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/livefeed' element={<LiveFeed />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App