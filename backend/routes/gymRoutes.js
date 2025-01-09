const express = require("express");
const db = require("../db");
const router = express.Router();


// create a new gym
router.post("/create", (req, res) => {
    const sql = "INSERT INTO gyms (`gymName`, `gymRegion`) VALUES (?, ?)";
    const values = [req.body.gymName, req.body.gymRegion];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({message: "error while creating: " + err.message});
        return res.json({ success: "gym added successfully" });
    });
});

// get all gyms
router.get("/", (req, res) => {
    const sql = "SELECT * FROM gyms";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: "error while fetching: " + err.message});
        return res.json(result);
    });
});

// get gyms by region
router.get("/:region", (req, res) => {
    const region = req.params.region;
    const sql = `SELECT * FROM ${region}Gyms`;
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: "error while fetching: " + err.message});
        return res.json(result);
    });
});

// edit a gym
router.post("/:id", (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE gyms SET `gymName`=?, `gymRegion`=? WHERE gymID=?";
    const values = [
        req.body.gymName,
        req.body.gymRegion,
        id
    ];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: "error while updating: " + err.message});
        return res.json({ success: "gym updated successfully" });
    });
});


// delete a gym
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM gyms WHERE gymID=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({message: "error while deleting: " + err.message});
        return res.json({success: "gym deleted successfully"});
    });
});

module.exports = router;