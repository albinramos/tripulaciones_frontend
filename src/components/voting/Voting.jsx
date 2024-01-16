import React, { useState, useRef, useEffect} from "react";
import "./voting.css"
import { useNavigate } from 'react-router-dom';
import moment from "moment";

const Voting = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({})
  const [randomImage, setRandomImage] = useState(null);
  const [type, setType] = useState(null);
  const [mood, setMood] = useState(null);
  const [tag, setTag] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserInfo();
      await fetchStatus();
      await fetchRandomImage();
      setIsLoading(false);
    }
    fetchData();
  }, []);

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

  const fetchStatus =  async () => {
      const response = await fetch(
        "http://localhost:3006/vote/hasuservoted",
        {
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        }
      )
      const data = await response.json();
      //console.log(data);
      const newType = assignType(data)
      setType(newType);
  }

  const assignType = (data) => {
    const currentTime = moment().format('HH');

    if(data.message === 'User has not voted today') {
      if(currentTime < 12) {
        return 'entrada';
      }
      else if(currentTime >= 12) {
        return 'salida';
      }
    }
  
    if(data.clockinvote === null && data.clockoutvote === null && currentTime < 12) {
      return 'entrada';
    }
    else if(data.clockinvote !== null && data.clockoutvote === null && currentTime >= 12){
      return 'update';
    }
    else if(data.clockinvote === null && data.clockoutvote === null && currentTime >= 12){
      return 'salida';
    }
    else {
      return 'completed';
    }
  }

  const fetchRandomImage = () => {
    try {
      const imageList = ["perfil-1.png", "perfil-2.jpg","perfil-3.jpg","perfil-4.jpg","perfil-5.jpg","perfil-7.jpg","perfil-8.jpg","perfil-9.jpg", "perfil-10.jpg"];

      const randomIndex = Math.floor(Math.random() * imageList.length);

      const selectedImage = imageList[randomIndex];

      setRandomImage(selectedImage);
      
    } catch (error) {
      console.error("Error al obtener imágenes:", error);
    }
  };

  const handleMood = (mood) => {
    setMood(mood);
  };

  const handleNoVote = () => {
    if (window.location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  };

  const handleVote = async (e) => {
    e.preventDefault();

  try{
    if(type === 'entrada'){
      const response = await fetch("http://localhost:3006/vote/clockin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({clockinvote: mood, tag: tag})
      })
      if (response.ok) {
        console.log("Votación de entrada exitosa");
        navigate('/');
      } else {
        console.error("Error en la votación de entrada");
      }

    }
    else if(type === 'salida'){
      const response = await fetch("http://localhost:3006/vote/clockout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({clockoutvote: mood, tag: tag})
      })
      if (response.ok) {
        console.log("Votación de salida exitosa");
        navigate('/');
      } else {
        console.error("Error en la votación de salida");
      }
    }
    else if(type === 'update'){
      const response  = await fetch("http://localhost:3006/vote/updateclockout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({clockoutvote: mood, tag: tag})
      });
      if (response.ok) {
        console.log("Votación de salida exitosa");
        navigate('/');
      } else {
        console.error("Error en la votación de salida");
      }
    }
  }
     catch (error) {
    console.error("Error de red:", error);
    }
  }

  const typeClassName = (buttonType) => {
    if(buttonType === 'entrada' && type === 'entrada') {
      return 'type-button active';
    }
    else if(buttonType === 'salida' && type === 'salida') {
      return 'type-button active';
    }
    else {
      return 'type-button';
    }
  }

  const moodClassName = (moodType) => {
    if(moodType === mood) {
      return 'mood active';
    }
    else {
      return 'mood';
    }
  }

  const handleTag = (tag) =>{
    setTag(tag);
  }

  const tagClassName = (tagType) => {
    if(tagType === tag) {
      return 'tag-button active';
    }
    else {
      return 'tag-button';
    }
  }

  if(type === 'completed'){
    return(
      navigate('/')
    )
  }
console.log(userData)

if (isLoading) {
  return <div>Loading...</div>;
}

  return (
    <>
    <div id="root">
      <section className='main-container-voting'>
        <div className='main-first-div'>
          <img src='../src/assets/moodup-logo.png' alt='imagen-logo' className="imagen-logo"/>
          <img
              src={`../src/assets/imagenes/${randomImage}`}
              alt="imagen retrato"
              className="imagen-circular-mini"
          />
        </div>
        <div className='main-second-div'>
          <h2 className='h2-landing'><strong>¡</strong>Hola {userData.firstname || ''}!<strong> </strong></h2>
        </div>
        <div className='main-third-div'>
          <h4 className={typeClassName("entrada")}>Entrada</h4>
          <h4 className={typeClassName("salida")}>Salida</h4>
        </div>
        <div className='main-fourth-div'>
          <p className='p-landing'>¿Cómo te sientes hoy?</p>
        </div>
        <div className='main-faces-div'>
        <img
              src="../src/assets/enfado.png"
              alt="enfado"
              className={moodClassName(0)}
              onClick={() => handleMood(0)}
            />
            <img
              src="../src/assets/triste.png"
              alt="triste"
              className={moodClassName(1)}
              onClick={() => handleMood(1)}
            />
            <img
              src="../src/assets/neutral.png"
              alt="neutral"
              className={moodClassName(2)}
              onClick={() => handleMood(2)}
            />
            <img
              src="../src/assets/feliz.png"
              alt="feliz"
              className={moodClassName(3)}
              onClick={() => handleMood(3)}
            />
            <img
              src="../src/assets/muy-feliz.png"
              alt="muy-feliz"
              className={moodClassName(4)}
              onClick={() => handleMood(4)}
            />
        </div>
        <div className='main-fifth-div'>
          <p className='p-voting-cuentanos'>¡Cuéntanos más!</p>
          <p className='p-voting-cuentanos-mini'>Selecciona la razón por la que te sientes así</p>
        </div>
        <div className='main-sixth-div'>
          <p className="p-voting-razones">Razón</p>
          <div className="main-sixth-div-tres">
            <button className={tagClassName('personal')} onClick={() => handleTag('personal')}>Personal</button>
            <button className={tagClassName('conciliacion')} onClick={() =>handleTag('conciliacion')}>Conciliación</button>
            <button className={tagClassName('horario')} onClick={() =>handleTag('horario')}>Horario</button>
          </div>
          <div className="main-seventh-div-dos">
            <button className={tagClassName('ambiente laboral')} onClick={() =>handleTag('ambiente laboral')}>Ambiente laboral</button>
            <button className={tagClassName('motivacion')} onClick={() =>handleTag('motivacion')}>Motivación</button>
          </div>
          <div className="main-eighth-div-dos">
            <button className={tagClassName('relacion con la empresa')} onClick={() =>handleTag('relacion con la empresa')}>Relación con la empresa</button>
            <button className={tagClassName('otro motivo')} onClick={() =>handleTag('otro motivo')}>Otro motivo</button>
          </div>
        </div>
        <div className='buttons-voting-div'>
          <button className='button-voting' onClick={handleVote}>Votar</button>
          <button className='button-voting-no-vote' onClick={handleNoVote}>Seguir sin votar</button>
        </div>
      </section>
      </div>
    </>
  )
}

export default Voting