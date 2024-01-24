import React, { useState, useRef} from "react";
import './recuperar.css'
import { IoArrowBack } from "react-icons/io5";
import { Navigate, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"



const Recuperar = () => {

  const navigate = useNavigate();

  const handleBackLoginClick = () => {
    navigate('/login');
  };

  return(
    <>
      <section className="login-main-container">
        <div className="circulo-login">
          <img src={logo} alt="imagen retrato" className="imagen-circular-2"/>
        </div>
        <div className="recuperar-second-div">
          <p className="p-login-recuperar">Recupera tu contraseña</p>
          <form className="form-login">
          <input type="email" placeholder="Introduce tu E-mail" className='form-email-recuperar' name='email' />
          <button className="button-recuperar">Recuperar</button>
          </form>
        </div>
        <div className="recuperar-third-div" onClick={handleBackLoginClick}>
        <p className="p-recuperar-2">Back to Login</p>
        </div>
      </section>
    </>
  )
}

export default Recuperar