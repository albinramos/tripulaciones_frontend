import React, { useState, useRef} from "react";
import './entradasalida.css'
import { FaHome, FaEnvelope } from "react-icons/fa";
import { IoSettingsSharp, IoFileTrayOutline } from "react-icons/io5";
import { MdOutlineAlarm } from "react-icons/md";
import { BsFillQuestionCircleFill, BsClockHistory } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { Navigate, useNavigate } from 'react-router-dom';

const EntradaSalida = () => {

  const navigate = useNavigate();
  
  const handleHome = () => {
    navigate('/admin');
  };

  const handleAnalisis = () => { 
    navigate('/admin/analisis');
  }

  const handleAjustes = () => {
    navigate('/admin/ajustes');
  }

  const handleSugerencias = () => {
    navigate('/admin/sugerencias');
  }

  const handlePredicciones = () => {
    navigate('/admin/predicciones');
  }


  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3006/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        window.location.href = 'http://localhost:5173/admin/login';
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
              <li className="li-header active"><MdOutlineAlarm></MdOutlineAlarm> Entrada/Salida</li>
              <li className="li-header" onClick={handleAnalisis}><FaEnvelope></FaEnvelope> Análisis detallado</li>
              <li className="li-header" onClick={handlePredicciones}><BsClockHistory></BsClockHistory> Predicciones</li>
              <li className="li-header" onClick={handleSugerencias}><IoFileTrayOutline></IoFileTrayOutline> Sugerencias</li>
              <li className="li-header" onClick={handleAjustes}><IoSettingsSharp></IoSettingsSharp> Ajustes</li>
            </ul>
          </div>
          <div className="bottom-icons">
            <ul className="ul-bottom-icons">
              <img src="../src/assets/exit.png" className="li-bottom-icons" onClick={handleLogout}></img>
            </ul>
          </div>
          <div className="footer-admin">
            <img src="../src/assets/logo-company.png" alt="company logo" className="footer-admin-logo-header"></img>
          </div>
        </div>
        <div className="main-entradasalida">
          <div className="entradasalida-selectors">
            <p className="entradasalida-username"><strong>¡</strong>Hola<strong><br></br>ADMIN!</strong></p>
            <div className="entradasalida-selectors-div">
              <p className="p-departamentos">Departamentos</p>
                <select className="select-departamentos">
                  <option value="todos">Todos</option>
                  <option value="rrhh">RRHH</option>
                  <option value="marketing">Marketing</option>
                  <option value="desarrollo">Desarrollo</option>
                  <option value="contabilidad">Contabilidad</option>
                  <option value="analitica">Analítica</option>
                  <option value="it">IT</option>
                  <option value="ventas">Ventas</option>
                  <option value="atencion al cliente">Atención al cliente</option>
                </select>
            </div>
          </div>
          <div className="entradasalida-graphs-1">
            <div className="entradasalida-graph-1">
              <img src="http://localhost:3006/images/grafico_1.png" alt="grafico felicidad" className="grafico-indice-felicidad" />
            </div>
            <div className="entradasalida-graph-2">
            <img src="http://localhost:3006/images/grafico_7.png" alt="grafico felicidad" className="grafico-indice-felicidad" />
            </div>
          </div>
          <div className="entradasalida-graphs-2">
            <div className="entradasalida-graph-3">
            <img src="http://localhost:3006/images/grafico_2.png" alt="grafico felicidad" className="grafico-indice-felicidad" />
            </div>
            <div className="entradasalida-graph-4">
              <img src="http://localhost:3006/images/grafico_8.png" alt="grafico felicidad" className="grafico-indice-felicidad" />
            </div>
          </div>
          <div className="entradasalida-graphs-3">
            <div className="entradasalida-graph-5">
            <img src="http://localhost:3006/images/grafico_3.png" alt="grafico felicidad" className="grafico-indice-felicidad" />
            </div>
            <div className="entradasalida-graph-6">
              <img src="http://localhost:3006/images/grafico_9.png" alt="grafico felicidad" className="grafico-indice-felicidad" />
            </div>
          </div>
          <div className="entradasalida-graphs-4">
            <div className="entradasalida-graph-7">
            <img src="http://localhost:3006/images/grafico_5.png" alt="grafico felicidad" className="grafico-indice-felicidad" />
            </div>
            <div className="entradasalida-graph-8">
              <img src="http://localhost:3006/images/grafico_6.png" alt="grafico felicidad" className="grafico-indice-felicidad" />
            </div>
            <div className="entradasalida-graph-9">
              <img src="http://localhost:3006/images/grafico_4.png" alt="grafico felicidad" className="grafico-indice-felicidad" />
            </div>
          </div>
        </div>
    </section>
    </>
  )

  }

export default EntradaSalida