import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pokemon } from '../interfaces/interfaces';


function PokemonDetails() {

  // Hooks
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {

    const POKEMON_API_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${name}/`
    fetch(POKEMON_API_ENDPOINT)
      .then(res => res.json())
      .then(data => {
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

export default PokemonDetails;
