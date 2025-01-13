const express = require("express");
const db = require("../db");
const router = express.Router();


// get all decks
router.get("/", (req, res) => {
    //const sql = "SELECT * FROM pokemon_decks";
    const sql = "select pokemonName, trainerID, pokedexID from pokemons inner join trainer_pokemons on trainer_pokemons.pokemonID = pokemons.pokedexID";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: err.message });
        return res.json(result);
    });
});

// get deck by trainerID
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT pokemonName FROM pokemon_decks WHERE trainerID=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ message: err.message });
        return res.json(result);
    });
});

module.exports = router