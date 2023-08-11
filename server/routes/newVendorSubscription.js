const express = require('express');
const router = express.Router();
const newVendorSubscriptionController = require('./controllers/newVendorSubscriptionController');

// Define the API route
router.post('/newvendorsubscription/create', newVendorSubscriptionController.createNewVendorSubscription);

module.exports = router;
