import React, { useState, useRef, useEffect } from "react";
import './buzon.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Navigate, useNavigate } from 'react-router-dom';

const Sugerencias = () => {
  const [sugerencias, setSugerencias] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const navigate = useNavigate();

  const handlePerfil = () => {
    navigate('/');
  }

  useEffect(() => {
    getSugerencias();
  }, []);

  const reversedSugerencias = () => {
    const array = sugerencias.slice(Math.max(sugerencias.length - 10, 0))
    return array.reverse()
  }

  const getSugerencias = async () => {
    try {
      const response = await fetch('https://moodupapi.aramendi.dev/message/usermessages', {
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
      <section className="buzon-container">
        <p className="p-buzon-back" onClick={handlePerfil}><IoMdArrowRoundBack />Volver al perfil</p>
            <div className="buzon-graph-1">
              <ul className="buzon-ul">
                {reversedSugerencias().map((sugerencia, index) => (
                  <li className="buzon-li" key={`sugerencia_${index}`}>
                    <div className="buzon-li-div" onClick={() => handleSelectMessage(sugerencia.messageid)}>
                      <div className="buzon-messagewrapper">
                        <p className={`buzon-li-p ${selectedMessageId === sugerencia.messageid ? 'buzon-li-message-expanded' : 'buzon-li-message'}`}>
                          {sugerencia.message}
                        </p>
                        {selectedMessageId === sugerencia.messageid && sugerencia.response && (
                          <div className="buzon-response">
                            <h2 className="h2-buzon">Respuesta:</h2>
                            <p className="buzon-li-response">{sugerencia.response}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
      </section>
    </>
  )

}

export default Sugerencias