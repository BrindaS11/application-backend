const db = require('../database/connection'); // Assuming you have a db.js file to manage the MySQL connection

// Add a new user
const addUser = async (req, res) => {
    const data = req.body;  // Capture all incoming data dynamically
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) {
        return res.status(400).json({ message: "At least one field is required" });
    }

    try {
        const placeholders = keys.map(() => "?").join(", ");
        const query = `INSERT INTO users (${keys.join(", ")}) VALUES (${placeholders})`;

        await db.execute(query, values);
        res.status(201).json({ message: "User added successfully", data });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { addUser, getUserById, getAllUsers };
