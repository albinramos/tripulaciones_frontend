import React, { useState, useRef} from "react";
import "./login.css"

const Login = () => {

  return(
    <>
      <section className="login-main-container">
        <div className="circulo-login">
          <img src="../src/assets/circulo.jpg" alt="imagen retrato" className="imagen-circular"/>
        </div>
        <div className="login-second-div">
          <p className="p-login">Login</p>
          <input type="email" placeholder="E-mail" className='form-email' name='email' />
          <input type="password" placeholder="Password" className='form-password' name='password' />
          <p className="p-login-forgot-passsword">¿Olvidaste la contraseña?</p>
          <button className="button-login">Login</button>
        </div>
      </section>
    </>
  )
}

export default Login