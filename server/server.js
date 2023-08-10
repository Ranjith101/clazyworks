const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const registerRoute = require('./routes/register');

app.use(bodyParser.json());
app.use(cors())
app.use('/api', registerRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
