const express = require("express");
const db = require("../db");
const router = express.Router();

// get all decks
router.get("/", (req, res) => {
    const sql = "SELECT trainer_pokemons.trainerID, trainer_pokemons.pokemonID, pokemons.pokemonName FROM trainer_pokemons INNER JOIN pokemons ON trainer_pokemons.pokemonID = pokemons.dbID;";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: err.message });
        return res.json(result);
    });
});

// get deck by trainerID
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT trainer_pokemons.trainerID, trainer_pokemons.pokemonID, pokemons.pokemonName FROM trainer_pokemons INNER JOIN pokemons ON trainer_pokemons.pokemonID = pokemons.dbID WHERE trainerID=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ message: err.message });
        return res.json(result);
    });
});

module.exports = router