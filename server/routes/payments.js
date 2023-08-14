// const express = require('express');
// const router = express.Router();
// const paymentController = require('./controllers/paymentController');

// // Route to create a new payment intent
// router.post('/create-payment-intent', paymentController.createPaymentIntent);

// module.exports = router;


// paymentRoutes.js

const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NeWCHSFW8Husb3GDJvT9eIr1zqpRKHLx468Itm5WDUvz5glrDSCNQIIWbRVl5Ic2pNwzO8viG0X5iPB1j5W2Vi800Z0QCocc4');

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, paymentMethodToken } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodToken,
      confirm: true,
    });

    res.status(200).json({ paymentIntent });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
