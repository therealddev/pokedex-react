import { useState, useEffect } from 'react'
import { usePokemonContext } from '../context/PokemonContext';
import { Link } from 'react-router-dom';
import {Pokemon, PokemonsResponse} from '../interfaces/interfaces'
import { fetchPokemons, fetchPokemon } from '../services/pokemonService';



function Pokemons() {

  const API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'

  // Hooks
  const { state, dispatch } = usePokemonContext();
  const [pokemonsResponse, setPokemonsResponse] = useState<PokemonsResponse | undefined>();

  useEffect(() => {
    if (state.detailedPokemonsList.length === 0) {
      const getFirstData = async () => {        
        const newDetailedPokemons = await getDetailedPokemonsList(API_ENDPOINT)
        dispatch({ type: 'SET_POKEMONS', payload: newDetailedPokemons });          
      }
      getFirstData()
    }
  }, []);



  // Functions
  async function getDetailedPokemonsList(fetchURL: string) {

    const response = await fetch(fetchURL);
    const pokemonsData = await response.json();

    setPokemonsResponse(pokemonsData);

    const newDetailedPokemons = await Promise.all(
      pokemonsData.results.map(async (pokemon: Pokemon) => {
        const response = await fetch(pokemon.url);
        const pokemonData = await response.json();
        return pokemonData;
      })
    );

    console.log('newDetailedPokemons: ', newDetailedPokemons);
    return newDetailedPokemons;
    
  }

  async function loadMorePokemons() {
    const newDetailedPokemons = await getDetailedPokemonsList(pokemonsResponse.next)
    const newDetailedPokemonsList = [...state.detailedPokemonsList, ...newDetailedPokemons]
    dispatch({ type: 'SET_POKEMONS', payload: newDetailedPokemonsList });
  }


  return (
    <>

      <h1 className='underline mb-10'>Pokedex</h1>

      <main className='list-none grid grid-cols-4 gap-4'>
        {
          state.detailedPokemonsList?.map((pokemon: Pokemon) => (
            <Link
            key={pokemon.id}
            className='border'
              to={`pokemon/${pokemon.name}/`}>

              <p>#{pokemon.id}</p>
              <h3>{pokemon.name}</h3>

              <img src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt={`Front defamaint sprite of ${pokemon.name}`} />

            </Link>
          ))
        }
      </main>

      <button 
        className='mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
        onClick={loadMorePokemons}>
      Load more
      </button>

    </>
  )

}

export default Pokemons
