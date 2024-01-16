import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import "./login.css"

const Login = () => {

  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();
  
  const submitHandler = (e) => {
    e.preventDefault();
    setErrorMessage("");
    loginhandler(e);
  }

  const loginhandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = 'user';
    const body = {
      email,
      password,
      role
    }
    try{
      const result = await fetch("http://localhost:3006/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if(result.status === 200){
        const data = await result.json();
        navigate('/voting');
      }
      else{
        const data = await result.json();
        setErrorMessage(data.error || 'Invalid email or password');
      }
    }
    catch(e){
      setErrorMessage("Error al iniciar sesión")
    }
  }

  const handleForgotPasswordClick = () => {
    navigate('/recuperar');
  };

  return(
    <>
      <div >
      <section className="login-main-container">
        <div className="circulo-login">
          <img src="../src/assets/logo.png" alt="logo" className="imagen-circular"/>
        </div>
        <div className="login-second-div">
          <p className="p-login">Login</p>
          <form className="form-login" onSubmit={submitHandler}>
          <input type="email" placeholder="E-mail" className='form-email' name='email' />
          <input type="password" placeholder="Password" className='form-password' name='password' />
          <p className="p-login-forgot-passsword" onClick={handleForgotPasswordClick}>¿Olvidaste la contraseña?</p>
          <button className="button-login">Login</button>
          </form>
        </div>
      </section>
      </div>
    </>
    )
  
}

export default Login