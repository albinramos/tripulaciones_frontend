import React, { useState, useRef, useEffect} from "react";
import "./admin.css"
import { FaHome, FaEnvelope } from "react-icons/fa";
import { IoSettingsSharp, IoFileTrayOutline } from "react-icons/io5";
import { MdOutlineAlarm } from "react-icons/md";
import { BsFillQuestionCircleFill, BsClockHistory } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { Navigate, useNavigate } from 'react-router-dom';
import mooduplogo from '../../assets/moodup-logo.png';
import logocompany from "../../assets/logo-company.png"
import exit from "../../assets/exit.png"
import group from "../../assets/Group 2090.png"



const Admin = () => {
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    checkIsAdmin();
  }, []);

  const checkIsAdmin = async () => {
    try {
      const response = await fetch('https://moodupapi.aramendi.dev/isadmin', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.status === 401) {
        navigate('/admin/login');
      }
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        if (data.isAdmin === false) {
          navigate('/');
        }
      } else {
        console.error('Error al obtener sugerencias');
      }
    } catch (error) {
      console.error('Error al obtener sugerencias:', error.message);
    }
  }

  const navigate = useNavigate();

  const handleEntradasalida = () => {
    navigate('/admin/entradasalida');
  }

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
      const response = await fetch('https://moodupapi.aramendi.dev/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/admin/login')
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
        <img src={mooduplogo} alt='imagen-logo' className="imagen-logo-admin"/>
          <div className="ul-header-div">
            <ul>
            <li className="li-header active" onClick={() => handleNavigation("home")}><FaHome></FaHome> Home</li>
            <li className="li-header" onClick={handleEntradasalida}><MdOutlineAlarm></MdOutlineAlarm> Entrada/Salida</li>
              <li className="li-header" onClick={handleAnalisis}><FaEnvelope></FaEnvelope> Análisis detallado</li>
              <li className="li-header" onClick={handlePredicciones}><BsClockHistory></BsClockHistory> Predicciones</li>
              <li className="li-header" onClick={handleSugerencias}><IoFileTrayOutline></IoFileTrayOutline> Sugerencias</li>
              <li className="li-header" onClick={handleAjustes}><IoSettingsSharp></IoSettingsSharp> Ajustes</li>
            </ul>
          </div>
          <div className="bottom-icons">
            <ul className="ul-bottom-icons">
              <img src={exit} className="li-bottom-icons" onClick={handleLogout}></img>
            </ul>
          </div>
          <div className="footer-admin">
            <img src={logocompany} alt="company logo" className="footer-admin-logo-header"></img>
          </div>
        </div>
        <div className="main-admin">
          <div className="admin-selectors">
          <p className="admin-username"><strong>¡</strong>Hola<strong><br></br>ADMIN!</strong></p>
            <div className="admin-selectors-div">
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
          <div className="admin-graphs-1">
            <div className="admin-graph-1">
              <img src="https://moodupapi.aramendi.dev/images/grafico_1.png" alt="grafico felicidad" className="grafico-indice-felicidad" />
            </div>
            <div className="admin-graph-2">
              <img src="https://moodupapi.aramendi.dev/images/grafico_7.png" alt="grafico felicidad" className="grafico-indice-felicidad" />
            </div>
          </div>
          <div className="admin-graphs-2">
            <div className="admin-graph-3">
              <img src="https://moodupapi.aramendi.dev/images/grafico_4.png" alt="grafico felicidad" className="grafico-indice-felicidad" />
            </div>
            <div className="admin-graph-4">
              <img src={group} alt="grafico felicidad" className="grafico-indice-felicidad" />
            </div>
          </div>
        </div>
      </section>
    </>
  )

}

export default Admin