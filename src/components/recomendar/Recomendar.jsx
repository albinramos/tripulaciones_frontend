import './recomendar.css'
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Recomendar() {
    const [feedData, setFeedData] = useState([])
    const [mood, setMood] = useState(null);
    const [toWho, setToWho] = useState('');
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState({})
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [activeComponent, setActiveComponent] = useState('feed');
    const navigate = useNavigate();

    useEffect(() => {
        fetchFeedData();
        fetchUserInfo();
    }, [])

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
        setMood(emoji)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:3006/feed/create", {
            method: 'POST',
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
                        <p onClick={() => handleBackClick()}>⬅️</p>
                        <p className="welcome-message">My Mood Feed</p>
                        </div>
                        <p className="user-name">¡Hola {userData?.firstname}!</p>
                    </div>
                    <div className='logo-container'>
                        <img src="../src/assets/logo-company.png" alt="logo empresa" className="logo" />
                    </div>
                </div>
                {activeComponent === 'feed' ? (
                    <>
                        <div className="contacta-second-div" onClick={handlePublicacionClick}>
                            <div className='plus-sign-container'>
                                <p className='plus-sign'>+</p>
                                <p>Nueva publicación</p>
                            </div>
                        </div>
                        <div className='feed-container'>
                            {(feedData?.slice().reverse() || []).map((feed, index) => {
                                const emoji = feed.emoji === 1 ? '🤒' : feed.emoji === 2 ? '🌹' : '❤️';
                                return (
                                    <div className='feed-card' key={index}>
                                        <div className='feed-card-header'>
                                            <p className='emoji'>{emoji}</p>
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
                                    src="../src/assets/enfado.png"
                                    alt="enfado"
                                    className="emoji-select"
                                    onClick={() => handleMood(1)}
                                />
                                <img
                                    src="../src/assets/triste.png"
                                    alt="triste"
                                    className="emoji-select"
                                    onClick={() => handleMood(2)}
                                />
                                <img
                                    src="../src/assets/neutral.png"
                                    alt="neutral"
                                    className="emoji-select"
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