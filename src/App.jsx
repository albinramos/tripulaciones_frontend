import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Voting from './components/voting/Voting.jsx';
import Landing from './components/landing/Landing.jsx';
import Login from './components/login/Login.jsx';
import Contacta from './components/contacta/Contacta.jsx';
import Recuperar from './components/recuperar/Recuperar.jsx';
import Admin from './components/admin/Admin.jsx';
import './App.css'
import EntradaSalida from './components/admin/entradasalida/EntradaSalida.jsx';
import Analisis from './components/admin/analisis/Analisis.jsx';
import Ajustes from './components/admin/ajustes/Ajustes.jsx';
import Sugerencias from './components/admin/sugerencias/Sugerencias.jsx';
import Predicciones from './components/admin/predicciones/Predicciones.jsx';
import AdminLogin from '../src/components/admin/adminLogin/AdminLogin.jsx';
import Buzon from './components/buzon/Buzon.jsx';

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
            <Route path='/buzon' element={<Buzon />} />
            <Route path='/recuperar' element={<Recuperar />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin/entradasalida' element={<EntradaSalida />} />
            <Route path='/admin/analisis' element={<Analisis />} />
            <Route path='/admin/ajustes' element={<Ajustes />} />
            <Route path='/admin/sugerencias' element={<Sugerencias />} />
            <Route path='/admin/predicciones' element={<Predicciones />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
