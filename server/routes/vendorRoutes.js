const express = require('express');
const router = express.Router();
const vendorController = require('./controllers/fetchVendorController');

// GET vendor by ID
router.get('/vendors/:vendorId', vendorController.getVendorById);

module.exports = router;
