import './index.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [iniciarGirar, setIniciarGirar] = useState(false);
  const [caerDerecha, setCaerDerecha] = useState(false);
  const [caerAbajo, setCaerAbajo] = useState(false);
  const [caerIzquierda, setCaerIzquierda] = useState(false);
  const [caerArriba, setCaerArriba] = useState(false);
  const [final, setFinal] = useState(false);
  const [mostrarTextoFinal, setMostrarTextoFinal] = useState(false);
  const [textoMeQuiere, setTextoMeQuiere] = useState(true);
  const [animacionEnProceso, setAnimacionEnProceso] = useState(false);
  let meQuiere = useRef(null);
  let floresRestantes = useRef(4);

  const handleAnimationSpin = () => {
    if (caerAbajo && caerArriba && caerIzquierda && caerDerecha) {
      setFinal(true);
      return;
    }
    setIniciarGirar(true);
    const timer_girar = setTimeout(() => {
      setIniciarGirar(false);
    }, 2000);

    return () => clearTimeout(timer_girar);
  };

  const handleMeQuiereAnimacion = () => {
    floresRestantes.current = floresRestantes.current - 1;
    setAnimacionEnProceso(true);
    if (floresRestantes.current > 0) {
      meQuiere.current.classList.remove('invisible');
      meQuiere.current.classList.add('desaparecer');
    } else {
      meQuiere.current.classList.remove('invisible');
      meQuiere.current.classList.add('permanecer');
    }

    setTextoMeQuiere(!textoMeQuiere);

    const timer_texto_mequiere = setTimeout(() => {
      if (floresRestantes.current > 0) {
        meQuiere.current.classList.remove('desaparecer');
        meQuiere.current.classList.add('invisible');
      }
      setAnimacionEnProceso(false);
    }, 2100);
    return () => clearTimeout(timer_texto_mequiere);
  };

  useEffect(() => {
    console.log('se ejecuta useffect');
    if (final === true) {
      const timer_texto = setTimeout(() => {
        console.log('se ejecuta', mostrarTextoFinal);
        setMostrarTextoFinal(true);
        console.log('se ejecuta por segunda vez', mostrarTextoFinal);
      }, 2000);
      return () => clearTimeout(timer_texto);
    }
  }, [final]);

  const handleCaerDerecha = () => {
    if (animacionEnProceso) {
      return;
    }
    setCaerDerecha(true);
    handleMeQuiereAnimacion();
  };
  const handleCaerArriba = () => {
    if (animacionEnProceso) {
      return;
    }
    setCaerArriba(true);
    handleMeQuiereAnimacion();
  };
  const handleCaerAbajo = () => {
    if (animacionEnProceso) {
      return;
    }
    setCaerAbajo(true);
    handleMeQuiereAnimacion();
  };
  const handleCaerIZquierda = () => {
    if (animacionEnProceso) {
      return;
    }
    setCaerIzquierda(true);
    handleMeQuiereAnimacion();
  };

  return (
    <div className="w-screen h-screen bg-[#4b95dd] relative">
      {/* aca iria el container */}
      {final ? (
        <div className="w-screen h-screen flex justify-center items-center fixed z-50 top-0 left-0 text-[100px]">
          <div className={`${mostrarTextoFinal ? 'typewriter' : ''}`}>
            <h1>{mostrarTextoFinal ? 'Te amo' : ''}</h1>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="absolute bottom-0 left-0 z-10 w-full h-auto">
        <div className="h-[400px] w-[400px] mx-auto relative flex justify-center bottom-[400px] max-[1360px]:bottom-[200px]">
          <div
            className={`w-[400px] h-[400px] mx-auto relative flex justify-center items-center z-40 ${
              iniciarGirar ? 'girar' : ''
            }`}
          >
            <div
              className={`w-[140px] h-[140px] bg-[#feac16] absolute rounded-full z-20 cursor-pointer transition-all ease-in duration-100 hover:w-[150px] hover:h-[150px] ${
                final ? 'final cursor-default' : ''
              }`}
              onClick={handleAnimationSpin}
            ></div>
            <div
              className={`w-[140px] h-[140px] bg-[#f2ed2d] absolute top-[30px] rounded-full z-10 cursor-pointer ${
                caerArriba ? 'caer_arriba' : ''
              }`}
              onClick={handleCaerArriba}
            ></div>
            <div
              className={`w-[140px] h-[140px] bg-[#f2ed2d] absolute bottom-[30px] rounded-full z-10 cursor-pointer ${
                caerAbajo ? 'caer_abajo' : ''
              }`}
              onClick={handleCaerAbajo}
            ></div>
            <div
              className={`w-[140px] h-[140px] bg-[#f2ed2d] absolute right-[30px] rounded-full z-10 cursor-pointer ${
                caerDerecha ? 'caer_derecha' : ''
              }`}
              onClick={handleCaerDerecha}
            ></div>
            <div
              className={`w-[140px] h-[140px] bg-[#f2ed2d] absolute left-[30px] rounded-full z-10 cursor-pointer ${
                caerIzquierda ? 'caer_izquierda' : ''
              }`}
              onClick={handleCaerIZquierda}
            ></div>
          </div>
          <div className="w-4 h-[500px] mx-auto bg-green-700 text-green-700 rounded-md absolute bottom-[-310px] z-10"></div>
          <div
            className=" absolute top-[-40px] right-4 z-30 text-5xl text-gray-200 drop-shadow-2xl opacity-0 invisible"
            ref={meQuiere}
          >
            {textoMeQuiere ? 'Me quiere' : 'No me quiere'}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className=" absolute bottom-0 left-0 z-10"
        >
          <path
            fill="#38b02d"
            fill-opacity="1"
            d="M0,96L26.7,85.3C53.3,75,107,53,160,64C213.3,75,267,117,320,122.7C373.3,128,427,96,480,106.7C533.3,117,587,171,640,165.3C693.3,160,747,96,800,74.7C853.3,53,907,75,960,74.7C1013.3,75,1067,53,1120,42.7C1173.3,32,1227,32,1280,42.7C1333.3,53,1387,75,1413,85.3L1440,96L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div
        id="cloud"
        className="top-[200px] left-[-165px] animate-[move_15s_linear_backwards_infinite]"
      ></div>
      <div
        id="cloud"
        className="top-[360px] left-[-165px] animate-[move_15s_linear_backwards_infinite_6s]"
      ></div>
      <div
        id="cloud"
        className="top-[110px] left-[-165px] animate-[move_15s_linear_backwards_infinite_3s]"
      ></div>
    </div>
  );
}

export default App;
