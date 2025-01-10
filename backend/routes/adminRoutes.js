const express = require("express");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();


const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(403).json({message: "No Token Provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userId = decoded.id;
        next()
    } catch (err) {
        return res.status(500).json({message: "server error"})
    }
}

// login
router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const sql = "SELECT * from admins WHERE `adminUsername`=?";
    db.query(sql, [username], async (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.json({message: "error while fetching: " + err.message});
        }
        try {
            if (result.length === 0) {
                return res.status(409).json({message: "user does not exist"});
            }
            
            const dbPass = result[0].adminPassword;
            const isMatch = await bcrypt.compare(password, dbPass);
            if (!isMatch) {
                return res.status(401).json({message: "wrong password"})
            }
            const token = jwt.sign({id: result[0].adminID}, process.env.JWT_KEY, {expiresIn: '1h'})
            return res.status(201).json({token: token})
        }
        catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({message: "error while login: " + error.message});
        }
    });
});

// register
router.post("/register", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const sql = "SELECT * from admins WHERE `adminUsername`=?";
    db.query(sql, [username], async (err, result) => {
        if (err) return res.json({message: "error while fetching: " + err.message});
        if (result.length > 0) {
            return res.status(409).json({message: "user already exists"});
        }
        
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const insertSql = "INSERT INTO admins (`adminUsername`, `adminPassword`) VALUES (?, ?)";
            db.query(insertSql, [username, hashPassword], (err, result) => {
                if (err) return res.json({message: "error while register: " + err.message});
                return res.status(201).json({success: "admin registered successfully"});
            });
        } catch (error) {
            return res.status(500).json({message: "error hashing password"});
        }
    });
});

module.exports = router;