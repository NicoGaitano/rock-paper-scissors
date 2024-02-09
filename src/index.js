import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Cabecera from "./Cabecera";
import Pie from "./Pie";

const App = () => (
  <div className="contenedor">
    <Cabecera titulo="Juego piedra,papel o tijera " />
    <Pie />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
