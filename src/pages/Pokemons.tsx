import { useState, useEffect } from 'react'
import { usePokemonContext } from '../context/PokemonContext';
import {Pokemon, PokemonsResponse} from '../interfaces/interfaces'
import PokemonCard from '../components/PokemonCard';


function Pokemons() {

  const API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'

  // Hooks
  const { state, dispatch } = usePokemonContext();
  const [pokemonsResponse, setPokemonsResponse] = useState<PokemonsResponse | null>();

  useEffect(() => {
    const detailedPokemonListIsEmpty = state.detailedPokemonsList.length === 0
    if (detailedPokemonListIsEmpty) {
      const getFirstData = async () => {        
        const newDetailedPokemons = await getDetailedPokemonsList(API_ENDPOINT)
        dispatch({ type: 'SET_POKEMONS', payload: newDetailedPokemons as Pokemon[] });          
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
    if (pokemonsResponse == null || pokemonsResponse == undefined) return
    if (pokemonsResponse.next == null) return
    const newDetailedPokemons = await getDetailedPokemonsList(pokemonsResponse.next)
    const newDetailedPokemonsList = [...state.detailedPokemonsList, ...newDetailedPokemons]
    dispatch({ type: 'SET_POKEMONS', payload: newDetailedPokemonsList });
  }


  return (
    <>
    <div className='pokedex w-[87%] bg-white flex flex-col mx-auto px-3'>


      <h1 className='underline mb-10 text-[50px]'>Pokedex</h1>

      <main className='list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        {
          state.detailedPokemonsList?.map((pokemon: Pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id}/>
            ))
          }
      </main>

      <button 
        className='mt-10 bg-blue-500 hover:bg-blue-700
        text-white font-bold py-2 px-4 border border-blue-700
        rounded mx-auto mb-10'
        onClick={loadMorePokemons}
      >
      Cargar más Pokémon
      </button>

    </div>
    </>
  )

}

export default Pokemons
