const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieparser = require('cookie-parser');
const connectDB = require('./db/db');
const userRoutes = require('./routes/UserRoutes');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/users',userRoutes);

module.exports = app;