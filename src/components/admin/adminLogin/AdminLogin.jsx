import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import "./adminLogin.css"

const AdminLogin = () => {

  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();
  
  const submitHandler = (e) => {
    e.preventDefault();
    setErrorMessage("");
    loginAdminHandler(e);
  }

  const loginAdminHandler = async (e) => {
    console.log(e.target)
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = 'admin';
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
        console.log(data)
        navigate('/admin');
      }
      else{
        const data = await result.json();
        setErrorMessage(data.error || 'Invalid email or password');
      }
    }
    catch(e){
      setErrorMessage("Error al iniciar sesión admin")
    }
  }

  return(
    <>
      <div >
        <section className="login-main-container">
          <div className="login-second-div">
            <p className="p-login">Login</p>
            <form className="form-login" onSubmit={submitHandler}>
            <input type="email" placeholder="E-mail" className='form-email' name='email' />
            <input type="password" placeholder="Password" className='form-password' name='password' />
            <button className="button-login">Login Admin</button>
            </form>
          </div>
        </section>
      </div>
    </>
    )
  
}

export default AdminLogin