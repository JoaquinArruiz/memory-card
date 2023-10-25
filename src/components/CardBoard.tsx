import Pokemon from "../interfaces/pokemon";
import PokeCard from "./PokeCard"
import '../styles/CardBoard.scss'

function CardBoard({pokemons, clickCheck}:  {pokemons:Pokemon[], clickCheck:(id:number)=>void} ) {

    return (
            <div className='CardBoard'>
                {pokemons.map( (pokemon, index) => {
                    return <PokeCard pokemon={pokemon} id={pokemon.id} key={index} clickCheck={clickCheck}/>
                })}
            </div>
    );
}

export default CardBoard;