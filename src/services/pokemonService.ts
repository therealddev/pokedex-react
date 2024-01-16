import {Pokemon} from '../interfaces/interfaces'

const API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'

export const fetchPokemons = async (): Promise<Pokemon[]> => {

  const response = await fetch(API_ENDPOINT);
  const data = await response.json();

  return data
};

