import { Routes, Route } from 'react-router-dom'

import Pokemons from './pages/Pokemons'
import Pokemon from './pages/PokemonDetails'

import { PokemonProvider } from './context/PokemonContext';


function App() {

  return (
  <PokemonProvider>
    <Routes>
      <Route path='/' element={<Pokemons/>} ></Route>
      <Route path='/pokemon/:name/' element={<Pokemon />} ></Route>
    </Routes>
  </PokemonProvider>)
  
  
  


}

export default App
