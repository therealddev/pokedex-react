export interface Pokemon {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  }
  url: string,
}

export interface detailedPokemonsList {
  results: Pokemon[];
}

export interface PokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSummary[];
}

export interface PokemonSummary {
  name: string;
  url: string;
}

