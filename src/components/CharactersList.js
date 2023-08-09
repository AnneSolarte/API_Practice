import React, { useEffect, useState } from 'react';

export const CharacterList = () => {
  const [listCharacter, setListCharacter] = useState([]);

  useEffect(() => {
    const storedCharacters = JSON.parse(localStorage.getItem("characters"));
    if (storedCharacters) {
      setListCharacter(storedCharacters);
    } else {
      getCharacters();
    }
  }, []);

  const getCharacters = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const { results } = await response.json();
      console.log(results);
      createList(results);
    } catch (error) {
      console.log(error.message);
    }
  };

  const createList = (characters) => {
    const newList = characters.map(element => ({
      id: element.id,
      name: element.name,
      image: element.image,
      fav: false,
    }));

    console.log(newList);
    setListCharacter(newList);
    localStorage.setItem("characters", JSON.stringify(newList)); // Save to local storage
  }

  const addFav = (id) => {
    const newList = listCharacter.map(character => {
      if (character.id === id) {
        return {
          ...character,
          fav: !(character.fav),
        };
      }
      return character;
    });

    setListCharacter(newList);
    localStorage.setItem("characters", JSON.stringify(newList)); // Save to local storage
  }

  return (
    <div className='box'>
      <h2>Character list</h2>

      <div className='content'>
        {listCharacter.map(character => (
          <div key={character.id} className='card'>
              <h3>{character.name}{" "}</h3>
              <img src={character.image} />
              <button onClick={() => addFav(character.id)}>{character.fav ? "Fav" : "Add"}</button>{" "}
          </div>
          
        ))}
      </div>
        
    </div>
  );
};