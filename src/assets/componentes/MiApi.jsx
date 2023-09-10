import React, { useState, useEffect } from "react";
import Buscador from "./Buscador";

function MiApi() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const pokemonesPorPagina = 10; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=151`
        );
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Ocurrió un error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Función para manejar el cambio de página
  const handlePaginaChange = (pagina) => {
    setPaginaActual(pagina);
  };

  // Filtrar los Pokémon por nombre
  const pokemonFiltrado = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filtro.toLowerCase())
  );

  // Calcular el índice de inicio y final de la página actual
  const indiceInicio = (paginaActual - 1) * pokemonesPorPagina;
  const indiceFinal = Math.min(
    indiceInicio + pokemonesPorPagina,
    pokemonFiltrado.length
  );

  // Obtener los Pokémon para la página actual
  const pokemonesPaginaActual = pokemonFiltrado.slice(
    indiceInicio,
    indiceFinal
  );

  // Calcular el número total de páginas
  const numeroTotalPaginas = Math.ceil(
    pokemonFiltrado.length / pokemonesPorPagina
  );

  // Generar los números de página
  const paginas = [];
  for (let i = 1; i <= numeroTotalPaginas; i++) {
    paginas.push(i);
  }

  return (
    <div className="container principal">
      <h2>Lista de Pokémon</h2>
      <Buscador onFilter={setFiltro} />
      <div className="row row-cols-1 row-cols-md-5">
        {pokemonesPaginaActual.map((pokemon) => (
          <div key={pokemon.name} className="col mb-4">
            <div className="card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split("/")[6]
                }.png`}
                className="card-img-top"
                alt={pokemon.name}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "12px" }}>
                  {pokemon.name}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Paginación">
        <ul className="pagination justify-content-center">
          {paginas.map((pagina) => (
            <li
              key={pagina}
              className={`page-item ${pagina === paginaActual ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePaginaChange(pagina)}
              >
                {pagina}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default MiApi;
