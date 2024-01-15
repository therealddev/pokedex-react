import { useState, useEffect } from 'react'
import './App.css'

interface Pokemons {
  name: string;
  url: string;
}

interface Pokemon {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  }
}

function App() {

  const INITIAL_DATA = {"count":1302,"next":"https://pokeapi.co/api/v2/pokemon?offset=12&limit=12","previous":null,"results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"},{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/"},{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/6/"},{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/"},{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/"},{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/"},{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon/10/"},{"name":"metapod","url":"https://pokeapi.co/api/v2/pokemon/11/"},{"name":"butterfree","url":"https://pokeapi.co/api/v2/pokemon/12/"}]}
  
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const pokemonsData = await Promise.all(
        INITIAL_DATA.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const pokemonData = await response.json();
          return pokemonData;
        })
      );
      
      console.log('pokemonsData: ', pokemonsData)
      setPokemons(pokemonsData);
    };
  
    fetchData();
  }, []);

  return (
    <main >

      <h1 className='underline mb-10'>Pokedex</h1>

      <ul className='list-none grid grid-cols-4 gap-4'>
        {
          pokemons?.map(pokemon => (
            <li key={pokemon.id} className='border'>
              {pokemon.name}

              <img src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt={`Front default sprite of ${pokemon.name}`} />
            </li>
          ))
        }
      </ul>

    </main>
  )

}

export default App
