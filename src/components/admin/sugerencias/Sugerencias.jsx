import React, { useState, useRef, useEffect } from "react";
import './sugerencias.css'
import { FaHome, FaEnvelope } from "react-icons/fa";
import { IoSettingsSharp, IoFileTrayOutline } from "react-icons/io5";
import { MdOutlineAlarm } from "react-icons/md";
import { BsFillQuestionCircleFill, BsClockHistory } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { FaReply } from "react-icons/fa";
import { RiDeleteBinLine, RiSendPlaneFill } from "react-icons/ri";
import { PiCornersOut } from "react-icons/pi";
import { Navigate, useNavigate } from 'react-router-dom';
import mooduplogo from '../../../assets/moodup-logo.png'
import exit from "../../../assets/exit.png"
import logocompany from "../../../assets/logo-company.png"

const Sugerencias = () => {
  const [sugerencias, setSugerencias] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [replyingToMessageId, setReplyingToMessageId] = useState(null);
  const [reply, setReply] = useState({});
  const [messageHeights, setMessageHeights] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getSugerencias();
  }, []);

  const reversedSugerencias = () => {
    const array = sugerencias.slice(Math.max(sugerencias.length - 10, 0))
    return array.reverse()
  }

  const getSugerencias = async () => {
    try {
      const response = await fetch('https://moodupapi.aramendi.dev/message', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setSugerencias(data);
      } else {
        console.error('Error al obtener sugerencias');
      }
    } catch (error) {
      console.error('Error al obtener sugerencias:', error.message);
    }
  };

  const handleHome = () => {
    navigate('/admin');
  };

  const handleEntradasalida = () => {
    navigate('/admin/entradasalida');
  }

  const handleAjustes = () => {
    navigate('/admin/ajustes');
  }

  const handleAnalisis = () => {
    navigate('/admin/analisis');
  }

  const handlePredicciones = () => {
    navigate('/admin/predicciones');
  }


  const handleLogout = async () => {
    try {
      const response = await fetch('https://moodupapi.aramendi.dev/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('admin/login');
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  const handleSelectMessage = (id) => {
    if (selectedMessageId === id) {
      setSelectedMessageId(null);
      setReplyingToMessageId(null);
    } else {
      setSelectedMessageId(id);
      setReplyingToMessageId(null);

      const messageContainer = document.getElementById(`message-container-${id}`);
      if (messageContainer) {
        const messageHeight = messageContainer.scrollHeight;
        setMessageHeights({ ...messageHeights, [id]: messageHeight });
      }
    }
  };


  const handleDeleteMessage = async (id) => {
    try {
      const response = await fetch('https://moodupapi.aramendi.dev/message/delete', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
        credentials: 'include',
      });

      if (response.ok) {
        setSugerencias(sugerencias.filter(sugerencia => sugerencia.messageid !== id));
      } else {
        console.error('Error al eliminar sugerencia');
      }
    } catch (error) {
      console.error('Error al eliminar sugerencia:', error.message);
    }
  };

  const handleReplyChange = (id, event) => {
    setReply({ ...reply, [id]: event.target.value });
  };

  const handleReplyMessage = async (id) => {
    try {
      const response = await fetch('https://moodupapi.aramendi.dev/message/reply', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, response: reply[id] }),
        credentials: 'include',
      });

      if (response.ok) {
        const updatedSugerencias = sugerencias.filter(sugerencia => sugerencia.messageid !== id);
        setSugerencias(updatedSugerencias);
        setReply({ ...reply, [id]: '' });
        setSelectedMessageId(null);
        setReplyingToMessageId(null);
      } else {
        console.error('Error al responder a la sugerencia');
      }
    } catch (error) {
      console.error('Error al responder a la sugerencia:', error.message);
    }
  };

  const handleReplyButtonClick = (id, event) => {
    event.stopPropagation();
    setReplyingToMessageId(id);
  };


  return (
    <>
      <section className="admin-container">
        <div className="header-admin">
          <img src={mooduplogo} alt='imagen-logo' className="imagen-logo-admin" />
          <div className="ul-header-div">
            <ul>
              <li className="li-header" onClick={handleHome}><FaHome></FaHome> Home</li>
              <li className="li-header" onClick={handleEntradasalida}><MdOutlineAlarm></MdOutlineAlarm> Entrada/Salida</li>
              <li className="li-header" onClick={handleAnalisis}><FaEnvelope></FaEnvelope> Análisis detallado</li>
              <li className="li-header" onClick={handlePredicciones}><BsClockHistory></BsClockHistory> Predicciones</li>
              <li className="li-header active" ><IoFileTrayOutline></IoFileTrayOutline> Sugerencias</li>
              <li className="li-header" onClick={handleAjustes}><IoSettingsSharp></IoSettingsSharp> Ajustes</li>
            </ul>
          </div>
          <div className="bottom-icons">
            <ul className="ul-bottom-icons">
              <img src={exit} className="li-bottom-icons" onClick={handleLogout}></img>
            </ul>
          </div>
          <div className="footer-admin">
            <img src={logocompany} alt="company logo" className="footer-admin-logo-header"></img>
          </div>
        </div>
        <div className="main-sugerencias">
          <div className="sugerencias-selectors">
            <p className="admin-username"><strong>¡</strong>Hola<strong> ADMIN!</strong></p>
          </div>
          <div className="sugerencias-graphs-1">
            <div className="sugerencias-graph-1">
              <ul>
                {reversedSugerencias().filter(sugerencia => sugerencia.active === 1).map((sugerencia, index) => (
                  <li className="sugerencias-li" key={`sugerencia_${index}`}>
                  <div className="sugerencias-li-div" onClick={() => handleSelectMessage(sugerencia.messageid)} style={{ height: `${messageHeights[sugerencia.messageid] || 'auto'}` }}>
                      <div className="messagewrapper">
                        <span className="sugerencias-li-icon"><PiCornersOut></PiCornersOut></span>
                        <p className={`sugerencias-li-p ${selectedMessageId === sugerencia.messageid ? 'sugerencias-li-message-expanded' : 'sugerencias-li-message'}`}><span className="mensaje-sugerencias">Mensaje: </span>
                          {sugerencia.message}
                        </p>
                        {selectedMessageId === sugerencia.messageid && sugerencia.response && (
                          <div className="response">
                            <h2>Respuesta:</h2>
                            <p className="sugerencias-li-response">{sugerencia.response}</p>
                          </div>
                        )}
                      </div>
                      <div className="deletewrapper">
                        {!sugerencia.response && <button className="delete-reply" onClick={(e) => handleReplyButtonClick(sugerencia.messageid, e)}><FaReply /></button>}
                        <button className="delete-bin" onClick={(e) => { e.stopPropagation(); handleDeleteMessage(sugerencia.messageid); }}><RiDeleteBinLine /></button>
                      </div>
                      {replyingToMessageId === sugerencia.messageid && (
                        <div className="replywrapper" onClick={(e) => e.stopPropagation()}>
                          <textarea className="reply-sugerencias"
                            value={reply[sugerencia.messageid] || ''}
                            onChange={(e) => handleReplyChange(sugerencia.messageid, e)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleReplyMessage(sugerencia.messageid); } }}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button className="button-sugerencias-footer"  onClick={(e) => { e.stopPropagation(); handleReplyMessage(sugerencia.messageid); }}><RiSendPlaneFill /> Enviar</button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )

}

export default Sugerencias