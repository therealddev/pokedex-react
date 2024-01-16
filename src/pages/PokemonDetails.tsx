import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pokemon } from '../interfaces/interfaces';
import {getPokemonImage, formatNumberFourDigits} from '../helpers/helpers'
import PokemonTypes from '../components/PokemonTypes';


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


  return (<>


  {
    pokemon && (
    <div className='flex items-center justify-center flex-col bg-[#123]'>

      <header className=' bg-[#c1c1c1] w-[100%] flex flex-col justify-center items-center'>

        <div className='text-[30px]
        w-[60%] h-[60px] bg-white flex
        flex items-center justify-center pokedex-pokemon-pagination-title'>
          
          <h1 className='mb-0 mr-3'>{pokemon.name}</h1>

          <p className="id mb-0">
            <span className="number-prefix">N.º&nbsp;</span>
            {formatNumberFourDigits(pokemon.id)}
          </p>

        </div>

      </header>

      <main className=' bg-white mx-10 p-3'>

        <div className="grid grid-cols-2">
        
          <section className='p-1'>
            <img
              src={getPokemonImage(pokemon.id)}
              alt={`Front default sprite of ${name}`}
              className='h-[400px] border bg-[#F2F2F2]'
            />

            <div className="pokemon-base-points">
              <h3>Puntos de base</h3>

              <ul className='flex flex-row text-[11px] gap-1'>  
                <li className='border p-1'> 23 <span>PS</span> </li>
                <li className='border p-1'>73 <span>Ataque</span></li>
                <li className='border p-1'>61 <span>Defensa</span></li>
                <li className='border p-1'>11 <span>Ataque</span></li>
                <li className='border p-1'>15 <span>Defensa</span></li>
                <li className='border p-1'>72 <span>Velocidad</span></li>
              </ul>

            </div>

          </section>

          <section className='p-1'>

            <p className='pokemon-description mb-2'>
            Este Pokémon nace con una semilla en el lomo, que
            brota con el paso del tiempo.
            </p>

            <div className="pokemon-versions flex mb-2">
              <p className='border mr-3 p-1'>Version X</p>
              <p className='border p-1'>Version Y</p>
            </div>

            {/* TO-DO: Put this in a component */}
            <div className="pokemon-stats grid grid-cols-2 bg-[#bdc8ee] rounded p-5 mb-2">
              <div>

                <div className="pokemon-height">
                  <p className='text-white'>Altura</p>
                  <p>{pokemon.height}</p>
                </div>
              
                <div className="pokemon-height">
                  <p className='text-white'>Peso</p>
                  <p>{pokemon.weight}</p>
                </div>

                <div className="pokemon-height">
                  <p className='text-white'>Sexo</p>
                  <p>Standard</p>
                </div>
              </div>

              <div>

                <div className="pokemon-height">
                  <p className='text-white'>Categoría</p>
                  <p>Standard</p>
                </div>

                <div className="pokemon-height">
                  <p className='text-white'>Habilidad</p>
                  <p>Standard</p>
                </div>

              </div>

            </div>

            <div className="pokemon-type mb-2">
              <h3>Tipo</h3>
              <PokemonTypes pokemon={pokemon} />
            </div>

            <div className="pokemon-type mb-2">
              <h3>Debilidad</h3>
              
              <ul className="pokemon-versions flex mb-2">
                <li className='border mr-3 p-1'>Debilidad 1</li>
                <li className='border mr-3 p-1'>Debilidad 2</li>
                <li className='border p-1'>Debilidad 3</li>
              </ul>
            </div>
            
          </section>

        </div>

        <div className="pokemon-evolutions bg-[#bdc8ee] mt-5 p-3
        flex justify-center items-center">
          <ul className='flex flex-row gap-5'>
            <li>Evolution 1</li>
            <li>Evolution 2</li>
            <li>Evolution 3</li>
          </ul>
        </div>
      </main>
    </div>)
  } 

</>);
}

export default PokemonDetails;
