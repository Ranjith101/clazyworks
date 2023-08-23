
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session'); // Add this line
// const passport = require('passport');
const dotenv = require('dotenv');

const app = express();
var http = require('http').Server(app);
const port = process.env.PORT || 3001;
// app.use(passport.initialize());
// app.use(passport.session());

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const vendorRoute = require('./routes/vendor');
const newVendorSubscriptionRoute = require('./routes/newVendorSubscription'); // Add this line
const newSubscriptionRoute = require('./routes/newSubscription');
const vendorRoutes = require('./routes/vendorRoutes');
const razorpayRoutes = require('./routes/razorpayRoutes');
const paymentRoutes = require('./routes/controllers/fetchPaymentController');
const {verifyEmail} = require('./routes/controllers/verifyEmail');


app.use(bodyParser.json());
app.use(cors());

// Configure and use express-session middleware
app.use(
  session({
    secret: 'hG7$9pK*mZ#2sE8t', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Set to true if you're using HTTPS
      httpOnly: true, // Prevent client-side access to the cookie
      maxAge: 604800000, // 7 days (in milliseconds)
    },
    rolling: true,
  })
);

// Routes
app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', logoutRoute);
app.use('/api', vendorRoute);
app.use('/api', newVendorSubscriptionRoute); // Add this line
app.use('/api', newSubscriptionRoute);
app.use('/api', vendorRoutes);
app.use('/api/payment',razorpayRoutes)
app.use('/api/fetchpayment',paymentRoutes)
app.use('/api',verifyEmail)

dotenv.config()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

