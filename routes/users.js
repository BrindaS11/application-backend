const express = require('express');
const router = express.Router();
const { addUser, getUserById, getAllUsers } = require("../controllers/users");

router.get('/addUser', addUser);
router.get('/getUserById', getUserById);
router.get('/getAllUsers', getAllUsers);

module.exports = router;