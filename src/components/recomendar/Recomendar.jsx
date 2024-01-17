import './recomendar.css'
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";


export default function Recomendar() {
    const [feedData, setFeedData] = useState([])
    const [mood, setMood] = useState(null);
    const [toWho, setToWho] = useState('');
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState({})
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [activeComponent, setActiveComponent] = useState('feed');
    const navigate = useNavigate();
    const [activeEmoji, setActiveEmoji] = useState(null);

    useEffect(() => {
        fetchFeedData();
        fetchUserInfo();
    }, [])

    useEffect(() => {
        fetchFeedData();
    }, [isPopupVisible])

    const fetchFeedData = async () => {
        try {
            const response = await fetch("http://localhost:3006/feed", {
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            setFeedData(data);
        } catch (error) {
            console.error("Error de red:", error);
        }
    }

    const fetchUserInfo = async () => {
        try {
            const response = await fetch("http://localhost:3006/vote/userinfo", {
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error de red:", error);
        }
    }


    const handlePublicacionClick = () => {
        setActiveComponent('recomienda');
    }

    const handleMood = async (emoji) => {
        setMood(emoji);
        setActiveEmoji(emoji);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:3006/feed/create", {
            method: 'POST',
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                emoji: mood,
                towho: toWho,
                message: message,
            })
        });

        const data = await response.json();
        setIsPopupVisible(true);
    }

    const handlePopupClose = () => {
        setIsPopupVisible(false);
        setActiveComponent('feed');
    }

    const handleBackClick = () => {
        if(activeComponent === 'feed') {
            navigate('/')
        } else {
            setActiveComponent('feed');
        }
    }

    return (
        <>
            <section className={activeComponent === 'feed' ? 'main-container-contacta' : 'main-container-recomienda'}>
                <div className="header-div">
                    <div className="contacta-first-div-text">
                        <div className='top'>
                        <p className="welcome-message-icon" onClick={() => handleBackClick()}><IoMdArrowRoundBack /></p>
                        <p className="welcome-message">My Mood Feed</p>
                        </div>
                        <p className="user-name-feed">¡Hola <strong>{userData?.firstname}</strong>!</p>
                    </div>
                    <div className='logo-container-feed'>
                        <img src="../src/assets/logo-company.png" alt="logo empresa" className="logo" />
                    </div>
                </div>
                {activeComponent === 'feed' ? (
                    <>
                        <div className="contacta-second-div" onClick={handlePublicacionClick}>
                            <div className='plus-sign-container'>
                                <p className='plus-sign'><strong><CiSquarePlus /></strong></p>
                                <p className='publicacion-feed'>Nueva publicación</p>
                            </div>
                        </div>
                        <div className='feed-container'>
                            {(feedData?.slice().reverse() || []).map((feed, index) => {
                                const emojiImages = {
                                    1: '../src/assets/enfermo.png',
                                    2: '../src/assets/rosa.png',
                                    3: '../src/assets/corazon.png',
                                  };
                                return (
                                    <div className='feed-card' key={index}>
                                        <div className='feed-card-header'>
                                            <img src={emojiImages[feed.emoji]} alt={`Emoji ${feed.emoji}`} className='emoji-feed-chat' />
                                            <div className='feed-card-header-text'>
                                                <p className='feed-card-name'>{feed?.towho}</p>
                                                <p className='feed-card-date'>{feed?.date}</p>
                                            </div>
                                        </div>
                                        <div className='feed-card-body'>
                                            <p className='feed-card-text'>{feed?.message}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="emojis-container">
                            <div className='main-emojis-div'>
                                <img
                                    src="../src/assets/enfermo.png"
                                    alt="enfermo"
                                    className={`emoji-select ${activeEmoji === 1 ? 'active' : ''}`}
                                    onClick={() => handleMood(1)}
                                />
                                <img
                                    src="../src/assets/rosa.png"
                                    alt="felicitar"
                                    className={`emoji-select ${activeEmoji === 2 ? 'active' : ''}`}
                                    onClick={() => handleMood(2)}
                                />
                                <img
                                    src="../src/assets/corazon.png"
                                    alt="gracias"
                                    className={`emoji-select ${activeEmoji === 3 ? 'active' : ''}`}
                                    onClick={() => handleMood(3)}
                                />
                            </div>
                        </div>
                        <div className="form-container">
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    type="text"
                                    placeholder="Para:"
                                    className="towho-input"
                                    value={toWho}
                                    onChange={(e) => setToWho(e.target.value)}
                                />
                                <textarea
                                    placeholder="¡Di algo a tu compañero!"
                                    className="message-input"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <p className="anon-advice">Recuerda que todos los mensajes son anónimos. En caso de que quieras personalizar tu mensaje, añade tu nombre.</p>
                                <button className="button-contacta" >Enviar</button>
                            </form>
                        </div>
                    </>
                )}
                <div className="contacta-third-div">
                    {isPopupVisible && (
                        <div className="popup-container">
                            <div className="popup">
                                <img src="../../src/assets/logo-company.png" alt="logo empresa" className="popup-company-logo" />
                                <p className="p-popup">¡Tu mensaje se ha enviado con éxito!</p>
                                <button onClick={handlePopupClose} className="popup-button">{activeComponent === 'feed' ? 'Volver al perfil' : 'Volver al feed'}</button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}