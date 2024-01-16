import React from 'react'
import { Link } from 'react-router-dom'
import { Pokemon } from '../interfaces/interfaces';
import {getPokemonImage, formatNumberFourDigits} from '../helpers/helpers'
import PokemonTypes from '../components/PokemonTypes'

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

      <PokemonTypes pokemon={pokemon} />

    </div>
    </>
  )
}

export default PokemonCard