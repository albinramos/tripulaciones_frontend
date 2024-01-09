import React, { useState, useRef} from "react";
import "./voting.css"

const Voting = () => {

  return (
    <>
    <div id="root">
      <section className='main-container'>
        <div className='main-first-div'>
          <img src='../src/assets/moodup-logo.png' alt='imagen-logo' className="imagen-logo"/>
          <img src='../src/assets/circular-1.png' alt='imagen retrato' className='imagen-circular-mini'/>
        </div>
        <div className='main-second-div'>
          <h2 className='h2-landing'><strong>¡</strong>Hola <strong>AGER!</strong></h2>
        </div>
        <div className='main-third-div'>
          <h4 className='h4-landing-entrada'>Entrada</h4>
          <h4 className='h4-landing-salida'>Salida</h4>
        </div>
        <div className='main-fourth-div'>
          <p className='p-landing'>¿Cómo te sientes hoy?</p>
        </div>
        <div className='main-faces-div'>

        </div>
      </section>
      </div>
    </>
  )
}

export default Voting