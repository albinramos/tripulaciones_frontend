import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Voting from './components/voting/Voting.jsx';
import Landing from './components/landing/Landing.jsx';
import Login from './components/login/Login.jsx';
import Contacta from './components/contacta/Contacta.jsx';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/voting' element={<Voting />} />
            <Route path='/' element={<Landing />} />
            <Route path='/contacta' element={<Contacta />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
