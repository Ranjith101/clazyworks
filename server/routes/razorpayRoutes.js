const router = require('express').Router();
const razorpay = require('razorpay');
const crypto = require('crypto');
const db = require('../db'); // Import your database connection

router.post("/orders", async (req, res) => {
    try {
        const instance = new razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        });
        const options = {
            amount: req.body.amount,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString('hex')
        };
        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Error occurred while creating order" });
            }
            res.status(200).json({ data: order });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal error" });
    }
});


router.post("/verify", async (req, res) => {
    try {
        const { response, userId, username } = req.body;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Store payment details in the database
            const insertPaymentQuery = 'INSERT INTO Payments (user_id, username, payment_id, payment_amount) VALUES (?, ?, ?, ?)';
            const insertPaymentValues = [userId, username, razorpay_payment_id, response.amount ]; // Convert amount to actual currency
            console.log(insertPaymentValues,"payment");
            db.query(insertPaymentQuery, insertPaymentValues, (err, result) => {
                if (err) {
                    console.error('Error storing payment details:', err);
                    return res.status(500).json({ message: 'Error storing payment details' });
                }
                return res.status(200).json({ message: 'Payment verified and details stored' });
            });

        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

module.exports = router;
