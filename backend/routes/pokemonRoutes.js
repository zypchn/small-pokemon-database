const express = require("express");
const db = require("../db");
const router = express.Router();


// create a new pokemon
router.post("/create", (req, res) => {
    const sql = "INSERT INTO pokemons (`pokedexID`, `pokemonName`, `type`) VALUES (?, ?, ?)";
    const values = [req.body.pokedexID, req.body.pokemonName, req.body.type];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({message: "error while creating: " + err.message});
        return res.json({ success: "pokemon added successfully" });
    });
});

// get all pokemon
router.get("/", (req, res) => {
    const sql = "SELECT * FROM pokemons";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: "error while fetching: " + err.message });
        return res.json(result);
    });
});

// get a pokemon
router.get("/:id", (req, res) => {
    const pokedexID = req.params.id;
    const sql = "SELECT * FROM pokemons WHERE `pokedexID`=?";
    db.query(sql, [pokedexID], (err, result) => {
        if (err) return res.json({ message: "error while fetching: " + err.message });
        return res.json(result);
    });
});

// edit a pokemon
router.post("/:id", (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE pokemons SET `pokedexID`=?, `pokemonName`=?, `type`=? WHERE dbID=?";
    const values = [
        req.body.pokedexID,
        req.body.pokemonName,
        req.body.type,
        id
    ];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: "error while updating: " + err.message});
        return res.json({ success: "pokemon updated successfully" });
    });
});

// delete a pokemon
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const sql = "CALL deletePokemon(?)"
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({message: "error while deleting: " + err.message});
        return res.json({success: "pokemon deleted successfully"});
    });
});

module.exports = router;