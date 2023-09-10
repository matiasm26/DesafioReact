import React from 'react';

function Buscador({ onFilter }) {
  return (
    <div className="mb-3">
      <label htmlFor="buscador" className="form-label">
        Buscar Pokémon por nombre:
      </label>
      <input
        type="text"
        className="form-control"
        id="buscador"
        onChange={(e) => onFilter(e.target.value)}
        placeholder='Busca tu pokemon aquí'
      />
    </div>
  );
}

export default Buscador;
