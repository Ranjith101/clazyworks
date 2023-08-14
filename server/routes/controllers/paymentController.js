const stripe = require('stripe')('sk_test_51NeWCHSFW8Husb3GDJvT9eIr1zqpRKHLx468Itm5WDUvz5glrDSCNQIIWbRVl5Ic2pNwzO8viG0X5iPB1j5W2Vi800Z0QCocc4');

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, token, email } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
      payment_method: token, // The token you received from the client-side
      confirmation_method: 'manual',
      confirm: true,
      receipt_email: email, // The client's email
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  createPaymentIntent,
};
