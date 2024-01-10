import React, { useState, useEffect, useRef } from "react";
import "./landing.css"
import { AiOutlineTrophy } from "react-icons/ai";
import { Navigate, useNavigate } from 'react-router-dom';


const Landing = () => {
  const [fetchData, setFetchData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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


  const handleContactaClick = () => {
    navigate('/contacta');
  };

  return (
    <>
      <section className="landing-main-container">
        <div className="landing-first-div">
          <p className="landing-p-name">AGER<br></br>
          </p>
          <p className="landing-p-lastname">BARRAGAN</p>
        </div>
        <img src="../src/assets/logo-company.png" alt="imagen retrato" className="landing-company-logo" />
        <div className="landing-second-div">
          <AiOutlineTrophy className="landing-trophy" />
          <div className="landing-second-div-text">
            <p className="landing-p-puntos-numero">220</p>
            <p className="landing-p-puntos-letras">puntos</p>
          </div>
        </div>
        <div className="landing-third-div">
          <button className="landing-button-votar">VOTAR</button>
          <button className="landing-button-contacta" onClick={handleContactaClick}>CONTACTA</button>
        </div>
        <div className="landing-fourth-div">
          <button className="landing-button-felicita">FELICITA A TU COMPAÑERO/A</button>
          <button className="landing-button-cierre">CERRAR SESIÓN</button>
        </div>
      </section>
    </>
  )
}

export default Landing
