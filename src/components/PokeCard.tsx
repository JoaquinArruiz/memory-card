import { useState, useEffect } from "react";
import Pokemon from '../interfaces/pokemon'

function PokeCard({ pokemon, id, clickCheck }: { pokemon: Pokemon, id: number, clickCheck: (id: number) => void }) {
    const [pokemonId, setPokemonId] = useState<number>(0)
    
    const formatName = (pokemon:Pokemon):Pokemon => {
        const name = pokemon.name;
        const formattedName = name.toUpperCase();
        pokemon.name = formattedName;
        return pokemon;
    }

    useEffect(
        () => {
            setPokemonId(id)
            formatName(pokemon)
        }
        , [id, pokemon]
    )

    return (
        <>
            <div data-id={pokemonId} className="pokeCard" >
                {pokemon ? <img className="pokeImg" src={pokemon.sprite} onClick={() => { clickCheck(pokemonId) }} /> : ''}
                {pokemon ? <p className="pokeName">{pokemon.name}</p> : ''}
            </div>
        </>
    );
}

export default PokeCard;