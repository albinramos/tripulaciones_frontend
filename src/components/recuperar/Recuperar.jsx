import React, { useState, useRef} from "react";
import './recuperar.css'
import { IoArrowBack } from "react-icons/io5";
import { Navigate, useNavigate } from 'react-router-dom';



const Recuperar = () => {

  const navigate = useNavigate();

  const handleBackLoginClick = () => {
    navigate('/login');
  };

  return(
    <>
      <section className="login-main-container">
        <div className="circulo-login">
          <img src="../src/assets/logo.png" alt="imagen retrato" className="imagen-circular"/>
        </div>
        <div className="recuperar-second-div">
          <p className="p-login">Recupera tu contraseña</p>
          <form className="form-login">
          <input type="email" placeholder="Introduce tu E-mail" className='form-email' name='email' />
          <button className="button-recuperar">Recuperar</button>
          </form>
        </div>
        <div className="recuperar-third-div" onClick={handleBackLoginClick}>
        <IoArrowBack className="arrow-back" />
        <p className="p-recuperar-2">Login</p>
        </div>
      </section>
    </>
  )
}

export default Recuperar