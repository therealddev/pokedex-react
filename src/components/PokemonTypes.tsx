import { Pokemon } from '../interfaces/interfaces'
import pokemonTypes from '../data/pokemonTypes';


const PokemonTypes = ({pokemon}) => {

  return (
    <ul className='flex flex-row'>
      {
        pokemon.types.map(currType => {

        const detailedType = pokemonTypes.find((currDetailedType) => currDetailedType.name === currType.type.name)
        
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