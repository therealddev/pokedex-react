import { Routes, Route } from 'react-router-dom'

import Pokemons from './pages/Pokemons'
import Pokemon from './pages/Pokemon'

function App() {

  return <Routes>
    <Route path='/' element={<Pokemons/>} ></Route>
    <Route path='/pokemon/:name/' element={<Pokemon />} ></Route>
  </Routes>

}

export default App
