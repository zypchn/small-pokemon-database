const express = require("express");
const db = require("../db");
const router = express.Router();


// create a new trainer
router.post("/create", (req, res) => {
    const sql = "INSERT INTO trainers (`trainerName`, `trainerRegion`) VALUES (?, ?)";
    const values = [req.body.trainerName, req.body.trainerRegion];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({message: "error while creating: " + err.message});
        return(res.json("trainer created successfully"));
        /*
        const pokemonID = req.body.pokemonID;
        //const sql = "UPDATE trainer_pokemons SET `pokemonID`=? WHERE `trainerID`=?"
        const sql = "INSERT INTO trainer_pokemons (`trainerID`, `pokemonID`) VALUES=(?, ?)"
        db.query(sql, [pokemonID, id], (err, result) => {
            if (err) return res.json({message: "error while deleting: " + err.message});
            return res.json({success: "trainer updated successfully"});
        });
         */
    });
});

// get all trainers
router.get("/", (req, res) => {
    const sql = "SELECT * FROM trainers";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: "error while fetching: " + err.message });
        return res.json(result);
    });
});

// get a trainer by ID
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM trainers WHERE `trainerID`=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ message: "error while fetching: " + err.message });
        return res.json(result);
    });
});

// edit a trainer
router.post("/:id", async (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE trainers SET `trainerName`=?, `trainerRegion`=? WHERE `trainerID`=?";
    const values = [
        req.body.trainerName,
        req.body.trainerRegion,
        id
    ];
    await db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: "error while updating: " + err.message });
        const pokemonID = req.body.pokemonIDs;
        const sql = "UPDATE trainer_pokemons SET `pokemonID`=? WHERE `trainerID`=?"
        db.query(sql, [pokemonID, id], (err, result) => {
            if (err) return res.json({message: "error while deleting: " + err.message});
            return res.json({success: "trainer updated successfully"});
        });
    });
});

// delete a trainer
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const sql = "CALL deleteTrainer(?)";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({message: "error while deleting: " + err.message});
        return res.json({success: "trainer deleted successfully"});
    });
});

module.exports = router;