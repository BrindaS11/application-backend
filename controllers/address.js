const db = require('../database/connection'); // Assuming you have a db.js file to manage the MySQL connection

// Add a new address
const addAddress = async (req, res) => {
    const { userId, street, city, state, zip } = req.body;
    if (!userId || !street || !city || !state || !zip) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    try {
        const query = 'INSERT INTO addresses (user_id, street, city, state, zip) VALUES (?, ?, ?, ?, ?)';
        await db.execute(query, [userId, street, city, state, zip]);
        res.status(201).json({ message: "Address added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
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
