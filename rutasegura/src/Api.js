import React, { useState, useEffect } from "react";

function Api() {
  const url = "https://pokeapi.co/api/v2/pokemon"; // Specific Pokemon endpoint
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pokemonID, setPokemonID] = useState(815);

  const fetchInfo = () => {
    const realUrl = `${url}/${pokemonID}`;
    return fetch(realUrl)
      .then((res) => res.json())
      .then((data) => {
        const name = data.name;
        const spriteUrl = data.sprites.front_default; // Get the image URL from the response
        setImageUrl(spriteUrl);
        setName(name);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, [pokemonID]);

  const handleIncrement = (e) => {
    e.preventDefault();
    setPokemonID((prevID) => prevID < 1025 ? prevID + 1 : 1025);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    setPokemonID((prevID) => (prevID > 1 ? prevID - 1 : 1));
  };

  const handleIncrementTen = (e) => {
    e.preventDefault();
    setPokemonID((prevID) => prevID < 1015 ? prevID + 10 : 1025);
  };

  const handleDecrementTen = (e) => {
    e.preventDefault();
    setPokemonID((prevID) => (prevID > 10 ? prevID - 10 : 1));
  };

  return (
    <div className="Api" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>{pokemonID}</h1>
      <h1>{name}</h1>
      {imageUrl ? <img src={imageUrl} alt="Pokemon" /> : "Loading..."}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <form onSubmit={handleDecrement}>
          <button type="submit">-1</button>
        </form>
        <form onSubmit={handleIncrement}>
          <button type="submit">+1</button>
        </form>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
      <form onSubmit={handleDecrementTen}>
          <button type="submit">-10</button>
        </form>
        <form onSubmit={handleIncrementTen}>
          <button type="submit">+10</button>
        </form>
      </div>
    </div>
  );
}

export default Api;
