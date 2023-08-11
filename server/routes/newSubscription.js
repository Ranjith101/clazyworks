// const express = require('express');
// const router = express.Router();
// const newSubscriptionController = require('./controllers/newSubscriptionController');

// // Define the API route for creating a new subscription
// router.post('/subscription/create', newSubscriptionController.createNewSubscription);

// module.exports = router;

const express = require('express');
const router = express.Router();
const newSubscriptionController = require('./controllers/newSubscriptionController');

// Define the API route
router.post('/subscription/create', newSubscriptionController.createNewSubscription);

module.exports = router;
