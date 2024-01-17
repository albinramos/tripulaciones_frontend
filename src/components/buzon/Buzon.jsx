import React, { useState, useRef, useEffect } from "react";
import './buzon.css'
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

  useEffect(() => {
    getSugerencias();
  }, []);

  const reversedSugerencias = () => {
    const array = sugerencias.slice(Math.max(sugerencias.length - 10, 0))
    return array.reverse()
  }

  const getSugerencias = async () => {
    try {
      const response = await fetch('http://localhost:3006/message/usermessages', {
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

  

  const handleSelectMessage = (id) => {
    if (selectedMessageId === id) {
      setSelectedMessageId(null);
      setReplyingToMessageId(null);
    } else {
      setSelectedMessageId(id);
      setReplyingToMessageId(null);
    }
  };


  return (
    <>
      <section className="admin-container">
        <div className="main-user-sugerencias">
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
                        {selectedMessageId === sugerencia.messageid && sugerencia.response && (
                          <div className="response">
                            <h2>Respuesta:</h2>
                            <p className="sugerencias-li-response">{sugerencia.response}</p>
                          </div>
                        )}
                      </div>
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