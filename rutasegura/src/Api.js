import React, { useState, useEffect } from "react";
import "./Api.css";

function Api() {
  const url = "https://pokeapi.co/api/v2/pokemon"; 
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  const fetchInfo = () => {
    const promises = [];
    for (let i = 1; i <= 30; i++) {
      const realUrl = `${url}/${i}`;
      promises.push(
        fetch(realUrl)
          .then((res) => res.json())
          .then((data) => {
            console.log(data); // Log the data to ensure it's being fetched correctly
            return {
              name: data.name,
              id: data.id, 
              imageUrl: data.sprites.front_default,
            };
          })
      );
    }

    Promise.all(promises).then((results) => {
      console.log(results); // Log the results to ensure they are being set correctly
      setPokemonList(results);
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentPage((prevPage) => (prevPage < Math.floor(pokemonList.length / itemsPerPage) ? prevPage + 1 : prevPage));
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset the current page to 0 when the search query changes
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = currentPage * itemsPerPage;
  const selectedPokemon = filteredPokemonList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: "20px", padding: "10px", fontSize: "16px" }}
      />
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        {selectedPokemon.map((pokemon, index) => (
          <div className="Api2" key={index}>
            <div className="Api" key={index} style={{ margin: "10px" }}>
              {pokemon.imageUrl ? <img src={pokemon.imageUrl} alt={pokemon.name} /> : "Loading..."}
            </div>
            <h1>#{pokemon.id}</h1>
            <h1>{pokemon.name}</h1>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <form onSubmit={handlePrevious}>
          <button type="submit">Anterior</button>
        </form>
        <form onSubmit={handleNext}>
          <button type="submit">Siguiente</button>
        </form>
      </div>
    </div>
  );
}

export default Api;