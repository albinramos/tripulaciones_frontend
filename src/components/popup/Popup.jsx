import React from 'react';
import './Popup.css';
import { AiOutlineTrophy } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";

const Popup = ({ onClose }) => {
  return (
    <div className="popup-voting-container">
      <div className="popup-voting">
        <img src="../../src/assets/logo-company.png" alt="logo empresa" className="popup-voting-company-logo" />
        <p className="p-popup-voting">¡Mood registrado con éxito!</p>
        <div className="popup-voting-div">
          <FaPlus className="popup-plus" />
          <AiOutlineTrophy className="popup-trophy" />
          <p className="puntos-popup-voting">1 punto</p>
        </div>
        <button onClick={onClose} className="popup-voting-button">Ir al perfil</button>
      </div>
    </div>
  );
};

export default Popup;
