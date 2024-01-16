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
    
    fetch(API_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        
        console.log('data: ', data)
        setPokemonsResponse(data)

        const fetchData = async () => {
          const pokemonsData = await Promise.all(
            data.results.map(async (pokemon: Pokemon) => {
              
              const response = await fetch(pokemon.url);
              const pokemonData = await response.json();
              // console.log('pokemonData: ', pokemonData)
              return pokemonData;
            })
          );
          
          const newPokemonsList = [...state.detailedPokemonsList, ...pokemonsData]
          dispatch({ type: 'SET_POKEMONS', payload: newPokemonsList });  
        
          
        };
      
        fetchData();
    
      })
  }, []);



  // Functions

  

  function getMorePokemons() {


    fetch(pokemonsResponse.next)
      .then(res => res.json())
      .then(newPokemons => {

        console.log('data: ', newPokemons)
        setPokemonsResponse(newPokemons)

        newPokemons

        // console.log('newPokemonsData: ', newPokemonsData)

        const fetchDataAgain = async () => {
          const newData = await Promise.all(
            newPokemons.results.map(async (pokemon: Pokemon) => {
              const response = await fetch(pokemon.url);
              const pokemonData = await response.json();
              return pokemonData;
            })
          );
          
          const newPokemonsList = [...state.detailedPokemonsList, ...newData]
          dispatch({ type: 'SET_POKEMONS', payload: newPokemonsList });          
        };

        fetchDataAgain();
        

        // setPokemons(newPokemons)
      })




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
        onClick={getMorePokemons}>
      Load more
      </button>

    </>
  )

}

export default Pokemons
