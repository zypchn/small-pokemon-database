const express = require("express");
const db = require("../db");
const router = express.Router();


// create a new trainer
router.post("/create", (req, res) => {
    const sql = "INSET INTO trainers (`trainerName`, `trainerRegion`) VALUES (?, ?)";
    const values = [req.body.trainerName, req.body.trainerRegion];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({message: "error while creating"});
        return res.json({ success: "trainer added successfully" });
    });
});

// get all trainers
router.get("/", (req, res) => {
    const sql = "SELECT * FROM trainers";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: "error while fetching" });
        return res.json(result);
    });
});

// get a trainer by ID
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM trainers WHERE `id`=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ message: "error while fetching" });
        return res.json(result);
    });
});

// edit a trainer
router.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE trainers SET `trainerName`=?, `trainerRegion`=? WHERE id=?";
    const values = [
        req.body.trainerName,
        req.body.trailerRegion,
        id
    ];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: "error while updating" });
        return res.json({ success: "trainer updated successfully" });
    });
});

// delete a trainer
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM trainers WHERE id=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({message: "error while deleting: " + err});
        return res.json({success: "trainer deleted successfully"});
    });
});

module.exports = router;