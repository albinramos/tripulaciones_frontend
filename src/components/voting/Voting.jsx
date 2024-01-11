import React, { useState, useRef, useEffect} from "react";
import "./voting.css"

const Voting = () => {

  const [randomImage, setRandomImage] = useState(null);
  const [type, setType] = useState(null);
  const [mood, setMood] = useState(null);
  const [tag, setTag] = useState(null);


  useEffect(() => {
    fetchStatus();
    fetchRandomImage();
  }, []);

  const fetchStatus =  async () => {
      const response = await fetch(
        "http://localhost:3006/vote/hasuservoted",
        {
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        }
      )
      const data = await response.json();
      const newType = assignType(data)
      setType(newType);
  }

  const assignType = (data) => {
    if(data.clockinvote === null && data.clockoutvote === null || data.message === 'User has not voted today'){
      return 'entrada';
    }
    else if(data.clockinvote !== null && data.clockoutvote === null){
      return 'salida';
    }
    else {
      return 'completed';
    }
  }

  const fetchRandomImage = () => {
    try {
      const imageList = ["perfil-1.jpg", "perfil-2.jpg","perfil-3.jpg","perfil-4.jpg","perfil-5.jpg","perfil-7.jpg","perfil-8.jpg","perfil-9.jpg", "perfil-10.jpg"];

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

  const handleVote = async (e) => {
    e.preventDefault();

    const clockinvote = e.target.clockin.value;
    const clockoutvote = e.target.clockout.value;
    const tag = e.target.tag.value;

  try{
    if(clockinvote==="" && state === 'entrada'){
      const response = await fetch("http://localhost:3006/voting/clockin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({clockinvote: clockinvote, tag: tag})
      })
      if (response.ok) {
        console.log("Votación de entrada exitosa");
      } else {
        console.error("Error en la votación de entrada");
      }
      if (response.ok) {
        console.log("Votación de salida exitosa");
      } else {
        console.error("Error en la votación de salida");
      }
    }
    else if(!clockoutvote && state === 'salida'){
      const response = await fetch("http://localhost:3006/voting/clockout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({clockoutvote: clockoutvote, tag: tag})
      })
      if (response.ok) {
        console.log("Votación de salida exitosa");
      } else {
        console.error("Error en la votación de salida");
      }
    }
    else{
      const response  = await fetch("http://localhost:3006/voting/updateclockout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({clockoutvote: clockoutvote, tag: tag})
      });
      if (response.ok) {
        console.log("Actualización de votación de salida exitosa");
      } else {
        console.error("Error en la actualización de votación de salida");
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


  return (
    <>
    <div id="root">
      <section className='main-container'>
        <div className='main-first-div'>
          <img src='../src/assets/moodup-logo.png' alt='imagen-logo' className="imagen-logo"/>
          <img
              src={`../src/assets/imagenes/${randomImage}`}
              alt="imagen retrato"
              className="imagen-circular-mini"
          />
        </div>
        <div className='main-second-div'>
          <h2 className='h2-landing'><strong>¡</strong>Hola <strong>AGER!</strong></h2>
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
            <button className={tagClassName()} onClick={() =>handleTag()}>Motivación</button>
          </div>
          <div className="main-eighth-div-dos">
            <button className={tagClassName('relacion con la empresa')} onClick={() =>handleTag('relacion con la empresa')}>Relación con la empresa</button>
            <button className={tagClassName('otro motivo')} onClick={() =>handleTag('otro motivo')}>Otro motivo</button>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}

export default Voting