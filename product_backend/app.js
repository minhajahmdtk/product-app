const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

require('dotenv').config();

const db = require('./config/db');
db();

// Disable Express version information
app.disable('x-powered-by');

// Routes
const Product = require('./routes/productRoutes');
const Auth = require('./routes/authRoutes');

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Product routes
app.use('/products', Product);

// Authentication routes
app.use('/auth', Auth);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});