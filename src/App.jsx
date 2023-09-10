import React from "react";
import "./App.css";
import MiApi from "./assets/componentes/MiApi";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const Style = {
    marginBottom: "45px",
  };

  return (
    <div className="container content bg-pokedex">
      <header className="text-black p-4 text-center" style={Style}>
        <h1>Bienvenido a la Pokédex</h1>
        <p>Explora la lista de Pokémon</p>
      </header>
        <MiApi />    
    </div>
  );
}

export default App;
