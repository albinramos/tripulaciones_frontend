import React, { useState, useRef} from "react";
import './ajustes.css'
import { FaHome, FaEnvelope } from "react-icons/fa";
import { IoSettingsSharp, IoFileTrayOutline } from "react-icons/io5";
import { MdOutlineAlarm } from "react-icons/md";
import { BsFillQuestionCircleFill, BsClockHistory } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { Navigate, useNavigate } from 'react-router-dom';

const Ajustes = () => {

  const navigate = useNavigate();
  
  const handleHome = () => {
    navigate('/admin');
  };

  const handleEntradasalida = () => {
    navigate('/entradasalida');
  }

  const handleAnalisis = () => { 
    navigate('/analisis');
  }

  const handleSugerencias = () => {
    navigate('/sugerencias');
  }

  const handlePredicciones = () => {
    navigate('/predicciones');
  }


  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3006/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        window.location.href = 'http://localhost:5173/login';
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return(
    <>
      <section className="admin-container">
        <div className="header-admin">
        <img src='../src/assets/moodup-logo.png' alt='imagen-logo' className="imagen-logo-admin"/>
          <div className="ul-header-div">
            <ul>
              <li className="li-header" onClick={handleHome}><FaHome></FaHome> Home</li>
              <li className="li-header" onClick={handleEntradasalida}><MdOutlineAlarm></MdOutlineAlarm> Entrada/Salida</li>
              <li className="li-header" onClick={handleAnalisis}><FaEnvelope></FaEnvelope> Análisis detallado</li>
              <li className="li-header" onClick={handlePredicciones}><BsClockHistory></BsClockHistory> Predicciones</li>
              <li className="li-header" onClick={handleSugerencias}><IoFileTrayOutline></IoFileTrayOutline> Sugerencias</li>
              <li className="li-header"><IoSettingsSharp></IoSettingsSharp> Ajustes</li>
            </ul>
          </div>
          <div className="bottom-icons">
            <ul className="ul-bottom-icons">
              <li className="li-bottom-icons"><BsFillQuestionCircleFill></BsFillQuestionCircleFill>Ayuda</li>
              <li className="li-bottom-icons" onClick={handleLogout}><ImExit></ImExit>Salir</li>
            </ul>
          </div>
          <div className="footer-admin">
            <img src="../src/assets/logo-company.png" alt="company logo" className="footer-admin-logo-header"></img>
            <p className="footer-admin-p">Jhon Doe</p>
          </div>
        </div>
        <div className="main-entadasalida">
          <div className="entradasalida-selectors">
            <p className="admin-username"><strong>¡</strong>Hola<strong><br></br>ADMIN!</strong></p>  
          </div>
        </div>
    </section>
    </>
  )

  }

export default Ajustes