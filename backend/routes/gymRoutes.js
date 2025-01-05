const express = require("express");
const db = require("../db");
const router = express.Router();

// create a new gym
router.post("/create", (req, res) => {
    const sql = "INSET INTO gyms (`gymName`, `Region`) VALUES (?, ?)";
    const values = [req.body.gymName, req.body.gymRegion];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({message: "error while creating"});
        return res.json({ success: "gym added successfully" });
    });
});

// get all gyms
router.get("/", (req, res) => {
    const sql = "SELECT * FROM gyms";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: "error while fetching" });
        return res.json(result);
    });
});

// get gyms by region
router.get("/:region", (req, res) => {
    const region = req.params.region;
    const sql = `SELECT * FROM ${region}Gyms`;
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: "error while fetching" });
        return res.json(result);
    });
});

// edit a gym
router.post("/editGym/:id", (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE gyms SET `gymName`=?, `gymRegion`=? WHERE id=?";
    const values = [
        req.body.gymName,
        req.body.gymName,
        id
    ];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: "error while updating" });
        return res.json({ success: "gym updated successfully" });
    });
});


// delete a gym
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM gyms WHERE id=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({message: "error while deleting: " + err});
        return res.json({success: "gym deleted successfully"});
    });
});

module.exports = router;