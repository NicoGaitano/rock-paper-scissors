import React, { useState,useEffect } from "react";
import "./index";
import img1 from "./img/piedra.png";
import img2 from "./img/papel.png";
import img3 from "./img/tijera.png";
import swal from 'sweetalert';
const opciones = [
  { opcion: "Piedra", imagenUrl: img1 },
  { opcion: "Papel", imagenUrl: img2 },
  { opcion: "Tijera", imagenUrl: img3 }
];

const Pie = () => {
  const [resultadoState, setResultadoState] = useState({ gano: 0, perdio: 0 });
  const [usuarioOpcion, setUsuarioOpcion] = useState({
    opcion: "",
    imagenUrl: ""
  });
  const [cpuOpcion, setCpuOpcion] = useState({
    opcion: "",
    imagenUrl: ""
  });
  const [imagenUsuario, setImagenUsuario] = useState(false);
  const [botonReglas, setBotonReglas] = useState(false);

  useEffect(() => {
    if (usuarioOpcion.imagenUrl) {
      setTimeout(() => {
  const random = Math.floor(Math.random() * opciones.length);
  const cpuSeleccion = opciones[random];
  if (
    (usuarioOpcion.opcion === "Tijera" &&
      cpuSeleccion.opcion === "Papel") ||
    (usuarioOpcion.opcion === "Piedra" &&
      cpuSeleccion.opcion === "Tijera") ||
    (usuarioOpcion.opcion === "Papel" && cpuSeleccion.opcion === "Piedra")
  ) {
    setResultadoState({ ...resultadoState, gano: resultadoState.gano + 1 });

    swal({
      title: "Ronda Ganada",
      text:
        "opcion elegida por el usuario " +
        ":" +
        `${usuarioOpcion.opcion}` +
        "," +
        "opcion elegida por la maquina" +
        ":" +
        `${cpuSeleccion.opcion}`,
      icon: "success",
      confirmButtonText: "ok"
    });
  } else if (usuarioOpcion.opcion !== cpuSeleccion.opcion) {
    setResultadoState({ ...resultadoState, perdio: resultadoState.perdio + 1 });
    swal({
      title: "Ronda Perdida",
      text:
        "opcion elegida por el usuario " +
        ":" +
        `${usuarioOpcion.opcion}` +
        "," +
        "opcion elegida por la maquina" +
        ":" +
        `${cpuSeleccion.opcion}`,
      icon: "error",
      confirmButtonText: "OK"
    });
  } else {
    swal({
      title: "Empate",
      text:
        "opcion elegida por el usuario " +
        ":" +
        `${usuarioOpcion.opcion}` +
        "," +
        "opcion elegida por la maquina" +
        ":" +
        `${cpuSeleccion.opcion}`,
      icon: "warning",
      confirmButtonText: "OK"
    });
  }
  setCpuOpcion({
    opcion: cpuSeleccion.opcion,
    imagenUrl: cpuSeleccion.imagenUrl
  });
  setBotonReglas(!botonReglas);
}, 2500);
clearTimeout();
}
}, [usuarioOpcion.imagenUrl]);

  const onClickHandler = (userSelected) => {
    const opcionSelected = opciones.filter(
      ({ opcion }) => opcion === userSelected
    )[0];

    setUsuarioOpcion({
      opcion: opcionSelected.opcion,
      imagenUrl: opcionSelected.imagenUrl
    });
    setImagenUsuario(true);
    setBotonReglas(!botonReglas);
  };
  if (usuarioOpcion.opcion && cpuOpcion.opcion) {
    setTimeout(() => {
      setUsuarioOpcion(!usuarioOpcion.opcion);
      setCpuOpcion(!cpuOpcion.opcion);
      setImagenUsuario(!imagenUsuario);
      if (resultadoState.gano === 5) {
        swal({
          title: "partida ganada",
          icon: "success",
          confirmButtonText: "OK",
        });
        setResultadoState({ gano: 0, perdio: 0 });
      }
      if (resultadoState.perdio === 5) {
        swal({
          title: "partida perdida",
          icon: "error",
          confirmButtonText: "OK",
        });

        setResultadoState({ gano: 0, perdio: 0 });
      }
    }, 4000);
  }
  
  const clickReinicio = () => {
    window.location.reload();
  };
  const clickReglas = () => {
    swal({
      title: "Reglas",
      text:
        "El primero en sumar 5 rondas gana la partida " +
        "," +
        "piedra le gana a tijeras" +
        "," +
        "papel le gana a piedra" +
        ":" +
        "tijera le gana a papel",
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="Ccontainer">
      <div className="marcador">
        <h2 className="titulo_marcador">Rondas ganas : {resultadoState.gano} </h2>
        <h2 className="titulo_marcador">Rondas perdidas : {resultadoState.perdio} </h2>
        {usuarioOpcion.imagenUrl ? (
          <p className="opcion">El usuario eligio : {usuarioOpcion.opcion}</p>
        ) : (
          <>
          </>
        )}
        {cpuOpcion.imagenUrl ? (
          <p className="opcion">La maquina eligio : {cpuOpcion.opcion}</p>
        ) : (
          <>
          </>
        )}
      </div>

      <div className="image">
        {usuarioOpcion.imagenUrl ? (
          <img
            className="rounded float-left imagen_usuario_cpu "
            src={usuarioOpcion.imagenUrl}
            alt={usuarioOpcion.opcion}
          />
        ) : (
          <></>
        )}

        {cpuOpcion.imagenUrl ? (
          <img
            className="rounded float-right imagen_usuario_cpu "
            src={cpuOpcion.imagenUrl}
            alt={cpuOpcion.opcion}
          />
        ) : (
          <></>
        )}
      </div>

      <div className="botones_caja row">
        {opciones.map(({ opcion }) => (
          <button
            key={opcion}
            onClick={() => onClickHandler(opcion)}
            className="boton col-sm"
            disabled={imagenUsuario}
          >
            {opcion}
          </button>
        ))}

        <button
          onClick={() => clickReglas()}
          disabled={botonReglas}
          className="boton col-sm"
        >
          Reglas
        </button>
        <button onClick={() => clickReinicio()} className="boton col-sm">
          Reiniar Juego
        </button>
      </div>
    </div>
  );
};
export default Pie;
