import { useState, useEffect } from 'react'

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

function Pokemons() {

  const API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'

  const INITIAL_DATA = {"count":1302,"next":"https://pokeapi.co/api/v2/pokemon?offset=12&limit=12","previous":null,"results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"},{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/"},{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/6/"},{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/"},{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/"},{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/"},{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon/10/"},{"name":"metapod","url":"https://pokeapi.co/api/v2/pokemon/11/"},{"name":"butterfree","url":"https://pokeapi.co/api/v2/pokemon/12/"}]}
  
  // Hooks
  const [pokemons, setPokemons] = useState(INITIAL_DATA)

  const [pokemonsData, setPokemonsData] = useState<Pokemon[] | null>(null);
  const [newPokemonsData, setnewPokemonsData] = useState<Pokemon[] | null>(null);

  useEffect(() => {

    console.log('pokemons: ', pokemons)

    const fetchData = async () => {
      const pokemonsData = await Promise.all(
        pokemons.results.map(async (pokemon) => {
          
          const response = await fetch(pokemon.url);
          const pokemonData = await response.json();
          // console.log('pokemonData: ', pokemonData)
          return pokemonData;
        })
      );
      
      console.log('pokemonsData: ', pokemonsData)
      setPokemonsData(pokemonsData);
    };
  
    fetchData();
  }, []);

  // Functions

  function getMorePokemons() {

    console.log('get more pokemons')
    console.log('pokemons.next: ', pokemons.next)

    fetch(pokemons.next)
      .then(res => res.json())
      .then(newPokemons => {
        newPokemons

        console.log('newPokemonsData: ', newPokemonsData)

        const fetchDataAgain = async () => {
          const newData = await Promise.all(
            newPokemons.results.map(async (pokemon) => {
              const response = await fetch(pokemon.url);
              const pokemonData = await response.json();
              // console.log('pokemonData: ', pokemonData)
              return pokemonData;
            })
          );
          
          console.log('pokemonsData: ', pokemonsData)
          setPokemonsData([...pokemonsData, ...newData]);
        };

        fetchDataAgain();
        

        setPokemons(newPokemons)
      })






  }

  return (
    <>

      <h1 className='underline mb-10'>Pokedex</h1>

      <main className='list-none grid grid-cols-4 gap-4'>
        {
          pokemonsData?.map(pokemon => (
            <a
              key={pokemon.id}
              className='border'
              href={`pokemon/${pokemon.name}/`}
            >
              <p>#{pokemon.id}</p>
              <h3>{pokemon.name}</h3>

              <img src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt={`Front defamaint sprite of ${pokemon.name}`} />
            </a>
          ))
        }
      </main>

      <button 
        className='mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
        onClick={getMorePokemons}>
      Load more
      </button>

    </>
  )

}

export default Pokemons
