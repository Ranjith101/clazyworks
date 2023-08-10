const express = require('express');
const router = express.Router();

const logoutController = require('./controllers/logoutController');

// Define the logout route
router.post('/logout', logoutController.logoutUser);

module.exports = router;
