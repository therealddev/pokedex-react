import React from 'react'
import { Link } from 'react-router-dom'
import { Pokemon } from '../interfaces/interfaces';
import {getPokemonImage, formatNumberFourDigits} from '../helpers/helpers'
import pokemonTypes from '../data/pokemonTypes';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({pokemon}) => {
  return (
    <>
    <div className=''>

      <Link
        key={pokemon.id}
        to={`pokemon/${pokemon.name}/`}
      >
        <img
          src={getPokemonImage(pokemon.id)}
          alt={`Image of the pokemon ${pokemon.name}`}
          className='bg-[#F2F2F2] rounded w-[100%]'
        />

      </Link>

      <p className="id">
        <span className="number-prefix">N.º&nbsp;</span>
        {formatNumberFourDigits(pokemon.id)}
      </p>

      <h3 className='mb-1'>{pokemon.name}</h3>

      <ul className='flex flex-row'>
        {pokemon.types.map((currType, i) => {

          const detailedType = pokemonTypes.find((currDetailedType) => currDetailedType.name === currType.type.name)
          
          return (
            <li
              key={i}
              className={`rounded me-1 px-3 border text-[11px]`}
              style={{background: `${detailedType.color}`}}
            >
              {detailedType.name}
            
            </li>
          )
          
        }
        )}
      </ul>

    </div>
    </>
  )
}

export default PokemonCard