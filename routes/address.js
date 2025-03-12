const express = require('express');
const router = express.Router();
const { addAddress, getAddressById, getAllAdresses } = require("../controllers/address");

router.post('/addAddress', addAddress);
router.get('/getAddressById', getAddressById);
router.get('/getAllAdresses', getAllAdresses);

module.exports = router;
