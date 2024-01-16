import pokemonTypes from '../data/pokemonTypes';
import { Pokemon } from '../interfaces/interfaces';

interface PokemonTypesProps {
  pokemon: Pokemon;
}

const PokemonTypes: React.FC<PokemonTypesProps> = ({ pokemon }) => {

  return (
    <ul className='flex flex-row'>
      {
        pokemon.types.map(currType => {

        const detailedType = pokemonTypes.find((currDetailedType) => currDetailedType.name === currType.type.name)
        if (!detailedType) return

        return (
          <li
            key={detailedType.id}
            className={`rounded me-1 px-3 border text-[11px]`}
            style={{background: `${detailedType.color}`}}
          >
            {detailedType.spanishName}
          </li>
        )
      }
      )
      }
    </ul>
  )
}

export default PokemonTypes