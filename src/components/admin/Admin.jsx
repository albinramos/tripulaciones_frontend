import React, { useState, useRef, useEffect} from "react";
import "./admin.css"
import { FaHome, FaEnvelope } from "react-icons/fa";
import { IoSettingsSharp, IoFileTrayOutline } from "react-icons/io5";
import { MdOutlineAlarm } from "react-icons/md";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";



const Admin = () => {

  return(
    <>
      <section className="admin-container">
        <div className="header-admin">
        <img src='../src/assets/moodup-logo.png' alt='imagen-logo' className="imagen-logo-admin"/>
          <div className="ul-header-div">
            <ul>
              <li className="li-header"><FaHome></FaHome> Home</li>
              <li className="li-header"><MdOutlineAlarm></MdOutlineAlarm> Entrada/Salida</li>
              <li className="li-header"><FaEnvelope></FaEnvelope> Análisis detallado</li>
              <li className="li-header"><IoFileTrayOutline></IoFileTrayOutline> Sugerencias</li>
              <li className="li-header"><IoSettingsSharp></IoSettingsSharp> Ajustes</li>
            </ul>
          </div>
          <div className="bottom-icons">
            <ul className="ul-bottom-icons">
              <li className="li-bottom-icons"><BsFillQuestionCircleFill></BsFillQuestionCircleFill>Ayuda</li>
              <li className="li-bottom-icons"><ImExit></ImExit>Salir</li>
            </ul>
          </div>
          <div className="footer-admin">
            <img src="../src/assets/logo-company.png" alt="company logo" className="footer-admin-logo-header"></img>
            <p className="footer-admin-p">Jhon Doe</p>
          </div>
        </div>
        <div className="main-admin">
          <div className="admin-selectors">
          <p className="admin-username"><strong>¡</strong>Hola<strong><br></br>GUILLERMO!</strong></p>
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
              <h2 className="h2-admin-graph-1">Índice de felicidad</h2>
              <p className="date-admin-graph-1">Del 21 Sep. 2023 al 22 Oct. 2023</p>
            </div>
            <div className="admin-graph-2">
              <h2 className="p-admin-graph-2">Evolución diaria del índice de satisfacción</h2>
            </div>
          </div>
          <div className="admin-graphs-2">
            <div className="admin-graph-3">
              <h2 className="h2-admin-graph-3">VOTOS TOTALES</h2>
            </div>
            <div className="admin-graph-4">
              <h2 className="p-admin-graph-4">EVOLUCIÓN DE LOS VOTOS TOTALES</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  )

}








export default Admin