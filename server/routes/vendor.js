// routes/vendor.js

const express = require('express');
const router = express.Router();
const vendorController = require('./controllers/vendorController');

// Define the API route
router.post('/vendor/register', vendorController.registerVendor);

module.exports = router;
