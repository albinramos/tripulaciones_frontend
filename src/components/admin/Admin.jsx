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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus veritatis debitis recusandae harum id dignissimos, aspernatur similique quo impedit cupiditate dolores. Exercitationem qui impedit inventore ut, corporis voluptatem nemo doloremque!
          Facere dolore voluptate, excepturi repellat nam non eius temporibus atque tenetur accusamus, molestias exercitationem, magnam possimus facilis officiis? Assumenda possimus quibusdam doloremque impedit eos tenetur harum est consequuntur eius neque?
          Adipisci veritatis fugit doloribus quaerat sed sapiente numquam atque quam tempore, repellendus tempora, dolore magnam, impedit debitis dolores qui illo. Ab aspernatur a voluptatum? Facere laborum sequi consequuntur consequatur hic.
          Officiis fuga ullam quas explicabo culpa eos nemo repellat aut, ipsa inventore quo ut dolorum, aliquam cupiditate dolores, excepturi earum. Excepturi inventore numquam deleniti ut quod cum iste cupiditate optio?
          Rerum laudantium quia quo eum consectetur quibusdam vero odio quis vel qui id eius, consequatur porro iure aliquid autem, neque earum accusamus necessitatibus sed ad totam asperiores? Explicabo, sint officiis!
          At suscipit, totam praesentium architecto voluptatem reiciendis alias atque deleniti facere repellendus necessitatibus sit quam minima nobis cumque ab facilis fuga aperiam incidunt enim. A aliquam et rerum quae fugit?
          Exercitationem veritatis aperiam, provident consequuntur quaerat recusandae aspernatur voluptatum quam a molestiae amet aut inventore vel earum, molestias perferendis quo nihil non placeat nesciunt repellendus minus laudantium qui! Tempora, ratione.
          Facilis possimus, nemo delectus dolor cumque error? Veniam iure pariatur esse eos neque, dolorum quisquam nam sint, temporibus dicta voluptatibus assumenda harum provident architecto sapiente qui enim exercitationem quam vel.
          Libero, id! Impedit a similique at in, eligendi maxime illo atque laboriosam quaerat rem labore aliquam fugiat consequuntur delectus iste officiis accusamus quasi esse illum unde! Ad sunt quasi debitis!
          Aut aliquam accusantium veniam dolor natus vel architecto sed aliquid quas, modi voluptates animi, eligendi deserunt doloremque, a esse voluptatem sint dignissimos laborum repellendus. Maxime odit quam alias veniam explicabo!</p>
        </div>
      </section>
    </>
  )

}








export default Admin