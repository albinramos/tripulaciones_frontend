import React, { useState, useRef, useEffect } from "react";
import './sugerencias.css'
import { FaHome, FaEnvelope } from "react-icons/fa";
import { IoSettingsSharp, IoFileTrayOutline } from "react-icons/io5";
import { MdOutlineAlarm } from "react-icons/md";
import { BsFillQuestionCircleFill, BsClockHistory } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { FaReply } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';

const Sugerencias = () => {
  const [sugerencias, setSugerencias] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [reply, setReply] = useState({});
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
      const response = await fetch('http://localhost:3006/message', {
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
  console.log(sugerencias)

  const handleSelectMessage = (id) => {
    if (selectedMessageId === id) {
      setSelectedMessageId(null); // Deselect the message if it's already selected
    } else {
      setSelectedMessageId(id); // Select the message
    }
  };


  const handleDeleteMessage = async (id) => {
    try {
      const response = await fetch('http://localhost:3006/message/delete', {
        method: 'DELETE',
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
      const response = await fetch('http://localhost:3006/message/reply', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, response: reply[id] }),
        credentials: 'include',
      });

      if (response.ok) {
        const updatedSugerencias = sugerencias.map(sugerencia => {
          if (sugerencia.messageid === id) {
            sugerencia.response = reply[id];
          }
          return sugerencia;
        });
        setSugerencias(updatedSugerencias);
        setReply({ ...reply, [id]: '' });
        setSelectedMessageId(null);
      } else {
        console.error('Error al responder a la sugerencia');
      }
    } catch (error) {
      console.error('Error al responder a la sugerencia:', error.message);
    }
  };


  return (
    <>
      <section className="admin-container">
        <div className="header-admin">
          <img src='../src/assets/moodup-logo.png' alt='imagen-logo' className="imagen-logo-admin" />
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
              <img src="../src/assets/exit.png" className="li-bottom-icons" onClick={handleLogout}></img>
            </ul>
          </div>
          <div className="footer-admin">
            <img src="../src/assets/logo-company.png" alt="company logo" className="footer-admin-logo-header"></img>
          </div>
        </div>
        <div className="main-sugerencias">
          <div className="sugerencias-selectors">
            <p className="admin-username"><strong>¡</strong>Hola<strong> ADMIN!</strong></p>
          </div>
          <div className="sugerencias-graphs-1">
            <div className="sugerencias-graph-1">
              <ul>
                {reversedSugerencias().map((sugerencia, index) => (
                  <li className="sugerencias-li" key={`sugerencia_${index}`}>
                    <div className="sugerencias-li-div" onClick={() => handleSelectMessage(sugerencia.messageid)}>
                      <div className="messagewrapper">
                        <p className={`sugerencias-li-p ${selectedMessageId === sugerencia.messageid ? 'sugerencias-li-message-expanded' : 'sugerencias-li-message'}`}>
                          {sugerencia.message}
                        </p>
                        {sugerencia.response && <p className="sugerencias-li-response">{sugerencia.response}</p>}
                      </div>
                      <div className="deletewrapper">
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteMessage(sugerencia.messageid); }}>Delete</button>
                        {!sugerencia.response && <button onClick={(e) => { e.stopPropagation(); handleSelectMessage(sugerencia.messageid); }}><FaReply /></button>}
                      </div>
                      {selectedMessageId === sugerencia.messageid && !sugerencia.response && (
                        <div className="replywrapper" onClick={(e) => e.stopPropagation()}>
                          <textarea value={reply[sugerencia.messageid] || ''} onChange={(e) => handleReplyChange(sugerencia.messageid, e)} onClick={(e) => e.stopPropagation()} />
                          <button onClick={(e) => { e.stopPropagation(); handleReplyMessage(sugerencia.messageid); }}>Submit</button>
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