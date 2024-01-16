import React, { useState, useRef, useEffect} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import "./contacta.css"

const Contacta = () => {

  const navigate = useNavigate();

  const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect (() => {
      fetchApi();
    }, []);

    const fetchApi = async () => {
      const response = await fetch('http://localhost:3006/', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
      }});
      if (response.status === 404) {
        navigate('/voting');
      } else {
        const responseJSON = await response.json();
        setFetchData(responseJSON);
      }
    }
  

    const [fetchData, setFetchData] = useState({
      userData: {
        firstname: '',
        lastname: ''
      },
      score: '',
      canUserVote: '',
    });
    console.log("contacta",fetchData);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
    try{
      const response = await fetch("http://localhost:3006/message/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name:null, dept:null, message: e.target.message.value})
      })
      if (response.ok) {
        console.log("mensaje enviado con exito");
        //setIsFormSubmitted(true);
        setIsPopupVisible(true);
      } else {
        console.error("Error en envío de mensaje");
      }
    }
       catch (error) {
      console.error("Error de red:", error);
      }
    }

    const handlePopupClose = () => {
      setIsPopupVisible(false);
      navigate('/');
    }

  return(
    <>
      <section className='main-container-contacta'>
      <div className="contacta-first-div">
        {/* <span className="contacta-icon-span"><IoMdArrowRoundBack></IoMdArrowRoundBack></span> */}
        <div className="contacta-first-div-text">
          <p className="contacta-p-name">{fetchData.userData.firstname}<br></br>
          </p>
          <p className="contacta-p-lastname">{fetchData.userData.lastname}</p>
        </div>
          <img src="../src/assets/logo-company.png" alt="logo empresa" className="contacta-company-logo"/>
        </div>
        <div className="contacta-second-div">
          <p className="contacta-p-contacta">Cuéntanos</p>
          <p className="contacta-p-contacta-2">Escribe cualquier duda, sugerencia, reclamación o<br></br>queja que tengas.</p>
        </div>
        <div className="contacta-third-div">
          <form className="form-contacta" onSubmit={handleSubmit}>
            <textarea className="contacta-textarea" placeholder="Escriba su comentario, sugerencia y/o reclamaciones aqui" name="message"></textarea>
            <p className="contacta-p-contacta-3">Recuerda que todos los mensajes son anónimos. En caso de que quieras personalizar tu mensaje, añade tu nombre, apellido y departamento. </p>
            <button className="button-contacta" >Enviar</button>
          </form>
          {isPopupVisible && (
            <div className="popup-container">
              <div className="popup">
                <img src="../../src/assets/logo-company.png" alt="logo empresa" className="popup-company-logo" />
                <p className="p-popup">¡Tu mensaje se ha enviado con éxito!</p>
                <button onClick={handlePopupClose} className="popup-button">Volver al perfil</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Contacta