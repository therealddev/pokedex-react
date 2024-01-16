import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Pokemon() {

  const POKEMON_API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/ditto'

  const { name } = useParams();

  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {

    fetch(POKEMON_API_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        console.log('data: ', data)
        setPokemon(data)
      })
    
  }, [])


  return (
    <>
      {
        pokemon && (
          <div>
          <p>#{pokemon.id}</p>
          <h2>Pokemon: {name}</h2>
          <img
            src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}
            alt={`Front default sprite of ${name}`}
            className='h-[200px]'
          />
  
        </div>
        )
      }

    </>
  );
}

export default Pokemon;
