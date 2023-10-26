import { useEffect, useState } from 'react'
import CardBoard from './CardBoard'
import Pokemon from '../interfaces/pokemon'
import ScoreBoard from './ScoreBoard'
import '../styles/App.scss'

function App() {
  const [pokemons, setPokemons] = useState([] as Pokemon[]);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [clickedPokemons, setClickedPokemons] = useState<number[]>([]);

  const fetchPokemons = ():void => {
    setPokemons([]);
    const usedNumbers = [54];
    for (let i = 0; i < 5; i++) {
      let randomNumber:number = Math.floor(Math.random() * 151) + 1
      if (usedNumbers.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 151) + 1
      }
      usedNumbers.push(randomNumber);
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
      .then(response => response.json())
      .then(data =>{
        const pokemon:Pokemon = {
          id: data.id,
          name: data.name,
          sprite: data.sprites.front_default
        }
        setPokemons(prevPokemons => [...prevPokemons, pokemon])
      })
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/psyduck`)
    .then(response => response.json())
    .then(data =>{
      const pokemon:Pokemon = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default
      }
      setPokemons(prevPokemons => [...prevPokemons, pokemon])
    })
  }

  useEffect(
    () => {
      fetchPokemons();
    }, []
  )

  const randomizer = ():void =>{
    const newPokemons = pokemons;
    for (let i = newPokemons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newPokemons[i], newPokemons[j]] = [newPokemons[j], newPokemons[i]];
    }
    setPokemons(newPokemons);
  }

  const restart = ():void =>{
    setScore(0);
    setClickedPokemons([]);
    randomizer();
    fetchPokemons();
  }

  const winner = ():void => {
    if (score === 5) {
      alert("You win!");
      restart();
      setPokemons([]);
    }
  }

  const clickCheck = (id:number):void => {
    if (clickedPokemons.includes(id)) {
      setScore(0);
      setClickedPokemons([]);
      randomizer();
      (score>highscore ? setHighscore(score) : "");
    }
    else {
      setScore(score+1);
      (score>=highscore ? setHighscore(score+1) : "");
      const newClickedPokemons = clickedPokemons;
      newClickedPokemons.push(id);
      setClickedPokemons(newClickedPokemons);
      randomizer()
      winner();
    }
  }

  
  return (
      <div className='container'>
        <h1>Memory Card</h1>
        <ScoreBoard score={score} highscore={highscore}/>
        <CardBoard pokemons={pokemons} clickCheck={clickCheck}/>
        <a href="https://github.com/JoaquinArruiz/">by: JoaquinArruiz</a>
      </div>
  )
}

export default App
