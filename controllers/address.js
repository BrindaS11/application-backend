const db = require('../database/connection'); // Assuming you have a db.js file to manage the MySQL connection

// Add a new address
const addAddress = async (req, res) => {
    const data = req.body;  // Capture all incoming data dynamically
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) {
        return res.status(400).json({ message: "At least one field is required" });
    }

    try {
        const placeholders = keys.map(() => "?").join(", ");
        const query = `INSERT INTO addresses (${keys.join(", ")}) VALUES (${placeholders})`;

        await db.execute(query, values);
        res.status(201).json({ message: "Address added successfully", data });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get address by ID
const getAddressById = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ message: "Address ID is required" });
    }
    
    try {
        const [rows] = await db.execute('SELECT * FROM addresses WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all addresses
const getAllAdresses = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM addresses');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { addAddress, getAddressById, getAllAdresses };
