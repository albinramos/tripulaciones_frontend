import React, { useState, useRef} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import "./contacta.css"

const Contacta = () => {

  return(
    <>
      <section className='main-container-contacta'>
      <div className="contacta-first-div">
        <div className="contacta-first-div-text">
          <p className="contacta-p-name">AGER<br></br>
          </p>
          <p className="contacta-p-lastname">BARRAGAN</p>
        </div>
          <img src="../src/assets/logo-company.png" alt="logo empresa" className="contacta-company-logo"/>
        </div>
        <div className="contacta-second-div">
          <p className="contacta-p-contacta">Cuéntanos</p>
          <p className="contacta-p-contacta-2">Escribe cualquier duda, sugerencia, reclamación o<br></br>queja que tengas.</p>
        </div>
        <div className="contacta-third-div">
          <form className="form-login">
            <textarea className="contacta-textarea" placeholder="Escriba su comentario, sugerencia y/o reclamaciones aqui"></textarea>
            <p className="contacta-p-contacta-3">Recuerda que todos los mensajes son anónimos. En caso de que quieras personalizar tu mensaje, añade tu nombre, apellido y departamento. </p>
            <button className="button-contacta">Enviar</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contacta