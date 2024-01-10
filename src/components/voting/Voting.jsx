import React, { useState, useRef, useEffect} from "react";
import "./voting.css"

const Voting = () => {

  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const fetchRandomImage = () => {
    try {
      // Obtener la lista de nombres de archivo de las imágenes en la carpeta "imagenes"
      const imageList = ["perfil-1.jpg", "perfil-2.jpg","perfil-3.jpg"]; // Lista de imágenes en assets/imagenes

      // Elegir una imagen aleatoria
      const randomIndex = Math.floor(Math.random() * imageList.length);
      const selectedImage = imageList[randomIndex];

      // Actualizar el estado con la imagen seleccionada
      setRandomImage(selectedImage);
    } catch (error) {
      console.error("Error al obtener imágenes:", error);
    }
  };

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
          <h4 className='h4-landing-entrada'>Entrada</h4>
          <h4 className='h4-landing-salida'>Salida</h4>
        </div>
        <div className='main-fourth-div'>
          <p className='p-landing'>¿Cómo te sientes hoy?</p>
        </div>
        <div className='main-faces-div'>
          <img src="../src/assets/enfado.png" alt="enfado" className="imagen-enfado"/>
          <img src="../src/assets/triste.png" alt="triste" className="imagen-triste"/>
          <img src="../src/assets/neutral.png" alt="neutral" className="imagen-neutral"/>
          <img src="../src/assets/feliz.png" alt="feliz" className="imagen-feliz"/>
          <img src="../src/assets/muy-feliz.png" alt="muy-feliz" className="imagen-muy-feliz"/>
        </div>
        <div className='main-fifth-div'>
          <p className='p-voting-cuentanos'>¡Cuéntanos más!</p>
          <p className='p-voting-cuentanos-mini'>Selecciona la razón por la que te sientes así</p>
        </div>
        <div className='main-sixth-div'>
          <p className="p-voting-razones">Razón</p>
          <div className="main-sixth-div-tres">
            <button className="button-voting-personal">Personal</button>
            <button className="button-voting-conciliacion">Conciliación</button>
            <button className="button-voting-horario">Horario</button>
          </div>
          <div className="main-seventh-div-dos">
            <button className="button-voting-ambiente">Ambiente laboral</button>
            <button className="button-voting-motivacion">Motivación</button>
          </div>
          <div className="main-eighth-div-dos">
            <button className="button-voting-relacion">Relación con la empresa</button>
            <button className="button-voting-otro">Otro motivo</button>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}

export default Voting