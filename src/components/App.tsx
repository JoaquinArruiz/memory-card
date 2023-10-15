import { useEffect, useState } from 'react'
import Pokemon from '../interfaces/Pokemon'

const startingPokemons:Pokemon[]= [
  {id:0, name:'', sprite:''},
]



function App() {
  const [pokemons, setPokemons] = useState(startingPokemons)

  useEffect(
    () => {
    for (let i = 0; i < 10; i++) {
      let randomNumber:number = Math.floor(Math.random() * 151) + 1
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
      .then(response => response.json())
      .then(data =>{
        let pokemon:Pokemon = {
          id: data.id,
          name: data.name,
          sprite: data.sprites.front_default
        }
        setPokemons(prevPokemons => [...prevPokemons, pokemon])
      })
    }
  }, []
  )

  const randomize = ():void =>{
    const newPokemons = pokemons;
    for (let i = newPokemons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newPokemons[i], newPokemons[j]] = [newPokemons[j], newPokemons[i]];
    }

    setPokemons(newPokemons);
  }

  return (
    <>
      <div>pokemons</div>
    </>
  )
}

export default App
