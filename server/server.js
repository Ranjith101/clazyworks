
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session'); // Add this line
// const passport = require('passport');

const app = express();
const port = process.env.PORT || 3000;
// app.use(passport.initialize());
// app.use(passport.session());

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const vendorRoute = require('./routes/vendor');
const newVendorSubscriptionRoute = require('./routes/newVendorSubscription'); // Add this line

app.use(bodyParser.json());
app.use(cors());

// Configure and use express-session middleware
app.use(
  session({
    secret: 'hG7$9pK*mZ#2sE8t', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true
  })
);

// Routes
app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', logoutRoute);
app.use('/api', vendorRoute);
app.use('/api', newVendorSubscriptionRoute); // Add this line

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

