import React, { useState, useRef} from "react";
import "./landing.css"
import { AiOutlineTrophy } from "react-icons/ai";


const Landing = () => {
  return(
    <>
      <section className="landing-main-container">
        <div className="landing-first-div">
          <p className="landing-p-name">AGER<br></br>
          </p>
          <p className="landing-p-lastname">BARRAGAN</p>
        </div>
        <img src="../src/assets/logo-company.png" alt="imagen retrato" className="landing-company-logo"/>
        <div className="landing-second-div">
          <AiOutlineTrophy className="landing-trophy"/>
          <div className="landing-second-div-text">
            <p className="landing-p-puntos-numero">220</p>
            <p className="landing-p-puntos-letras">puntos</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Landing
