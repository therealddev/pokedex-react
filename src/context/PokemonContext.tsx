// PokemonContext.tsx
import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';



interface State {
  detailedPokemonsList: [];
}

type Action = { type: 'SET_POKEMONS'; payload: [] };

interface ContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const PokemonContext = createContext<ContextProps | undefined>(undefined);

const pokemonReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_POKEMONS':
      return { ...state, detailedPokemonsList: action.payload };
    default:
      return state;
  }
};

const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
const [state, dispatch] = useReducer(pokemonReducer, { detailedPokemonsList: [] });

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
};

const usePokemonContext = (): ContextProps => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};

export { PokemonProvider, usePokemonContext };
