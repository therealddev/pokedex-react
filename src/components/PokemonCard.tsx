import React from 'react'
import { Link } from 'react-router-dom'
import { Pokemon } from '../interfaces/interfaces';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({pokemon}) => {
  return (
    <Link
      key={pokemon.id}
      className='border'
      to={`pokemon/${pokemon.name}/`}
    >

      <p>#{pokemon.id}</p>
      <h3>{pokemon.name}</h3>

      <img src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt={`Front defamaint sprite of ${pokemon.name}`} />

    </Link>
  )
}

export default PokemonCard