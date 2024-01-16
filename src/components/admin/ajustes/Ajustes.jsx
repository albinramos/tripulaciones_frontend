import React, { useState, useRef, useEffect} from "react";
import './ajustes.css'
import { FaHome, FaEnvelope } from "react-icons/fa";
import { IoSettingsSharp, IoFileTrayOutline } from "react-icons/io5";
import { MdOutlineAlarm } from "react-icons/md";
import { BsFillQuestionCircleFill, BsClockHistory } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { RiUserAddLine } from "react-icons/ri";
import { Navigate, useNavigate } from 'react-router-dom';

const Ajustes = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getUsers();
  }, []);

  const reversedUsers = () => {
    const array = users.slice(Math.max(users.length -10,0))
    return array.reverse()
  }

  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:3006/user', {
        method: 'GET',
        credentials: 'include', 
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Error al obtener usuarios');
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error.message);
    }

    }


  const navigate = useNavigate();
  
  const handleHome = () => {
    navigate('/admin');
  };

  const handleEntradasalida = () => {
    navigate('/admin/entradasalida');
  }

  const handleAnalisis = () => { 
    navigate('/admin/analisis');
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

  const handleCrearUsuario = async (e) => {
    console.log(e.target)
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const dept_deptid = e.target.dept_deptid.value;
    
    const body = {
      email,
      password,
      confirmPassword,
      firstname,
      lastname,
      dept_deptid      
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    if (!email || !password || !confirmPassword || !firstname || !lastname || !dept_deptid) {
      setErrorMessage("Todos los campos son obligatorios");
      return;
    }

    try{
      const result = await fetch("http://localhost:3006/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      //console.log("user creado con exito")
      if (!result.ok) {
        const errorData = await result.json();
        setErrorMessage(`Error en el servidor: ${errorData.message}`);
        return;
      }
    }
    catch(e){
      setErrorMessage("Error al iniciar sesión admin")
    }
  }


  return(
    <>
      <section className="admin-container">
        <div className="header-admin">
        <img src='../src/assets/moodup-logo.png' alt='imagen-logo' className="imagen-logo-admin"/>
          <div className="ul-header-div">
            <ul>
              <li className="li-header" onClick={handleHome}><FaHome></FaHome> Home</li>
              <li className="li-header" onClick={handleEntradasalida}><MdOutlineAlarm></MdOutlineAlarm> Entrada/Salida</li>
              <li className="li-header" onClick={handleAnalisis}><FaEnvelope></FaEnvelope> Análisis detallado</li>
              <li className="li-header" onClick={handlePredicciones}><BsClockHistory></BsClockHistory> Predicciones</li>
              <li className="li-header" onClick={handleSugerencias}><IoFileTrayOutline></IoFileTrayOutline> Sugerencias</li>
              <li className="li-header active"><IoSettingsSharp></IoSettingsSharp> Ajustes</li>
            </ul>
          </div>
          <div className="bottom-icons">
            <ul className="ul-bottom-icons">
              <li className="li-bottom-icons"><BsFillQuestionCircleFill></BsFillQuestionCircleFill>Ayuda</li>
              <li className="li-bottom-icons" onClick={handleLogout}><ImExit></ImExit>Salir</li>
            </ul>
          </div>
          <div className="footer-admin">
            <img src="../src/assets/logo-company.png" alt="company logo" className="footer-admin-logo-header"></img>
            <p className="footer-admin-p">Jhon Doe</p>
          </div>
        </div>
        <div className="main-ajustes">
          <div className="ajustes-selectors">
            <p className="admin-username"><strong>¡</strong>Hola<strong><br></br>ADMIN!</strong></p>  
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="ajustes-graphs-1">
              <form className="form-user" onSubmit={handleCrearUsuario}>
                <input type="text" placeholder="Nombre" className='ajustes-form-nombre' name='firstname' />
                <input type="text" placeholder="Apellido" className='ajustes-form-apellidos' name='lastname' />
                <input type="email" placeholder="E-mail" className='ajustes-form-email' name='email' />
                <select id="departamento" name="dept_deptid" className="ajustes-form-departamento" defaultValue="" required>
                  <option value="" disabled hidden>Departamento</option>
                  <option value="1">RRHH</option>
                  <option value="2">Marketing</option>
                  <option value="3">Desarrollo</option>
                  <option value="4">Contabilidad</option>
                  <option value="5">Analítica</option>
                  <option value="6">IT</option>
                  <option value="7">Ventas</option>
                  <option value="8">Atención al Cliente</option>
                </select>
                <input type="password" placeholder="Contraseña" className='ajustes-form-password' name='password' />
                <input type="password" placeholder="Repite la contraseña" className='ajustes-form-confirm-password' name='confirmPassword' />
                <button className="button-ajustes"><RiUserAddLine></RiUserAddLine>  Añadir Nuevo Usuario</button>
              </form>
          </div>
          <div className="ajustes-users">
            <ul>
              {reversedUsers().map((user, index) => (
                <li className="ajustes-li" key={`user_${index}`}>
                  <div className="ajustes-li-div">
                    <p className="ajustes-li-p">{user.firstname} {user.lastname}</p>
                    <p className="ajustes-li-p">{user.email}</p>
                    <p className="ajustes-li-p">{user.dept_deptid}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </section>
    </>
  )

  }

export default Ajustes