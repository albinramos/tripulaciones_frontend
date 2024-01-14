import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Voting from './components/voting/Voting.jsx';
import Landing from './components/landing/Landing.jsx';
import Login from './components/login/Login.jsx';
import Contacta from './components/contacta/Contacta.jsx';
import Recuperar from './components/recuperar/Recuperar.jsx';
import Admin from './components/admin/Admin.jsx';
import './App.css'
import EntradaSalida from './components/entradasalida/EntradaSalida.jsx';
import Analisis from './components/analisis/Analisis.jsx';
import Ajustes from './components/ajustes/Ajustes.jsx';
import Sugerencias from './components/sugerencias/Sugerencias.jsx';
import Predicciones from './components/predicciones/Predicciones.jsx';

function App() {

  return (
    <>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/voting' element={<Voting />} />
            <Route path='/contacta' element={<Contacta />} />
            <Route path='/recuperar' element={<Recuperar />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/entradasalida' element={<EntradaSalida />} />
            <Route path='/analisis' element={<Analisis />} />
            <Route path='/ajustes' element={<Ajustes />} />
            <Route path='/sugerencias' element={<Sugerencias />} />
            <Route path='/predicciones' element={<Predicciones />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
