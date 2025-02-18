const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./DB/connectDB');
const captainRoutes = require('./routes/captainRoutes');
const userRoutes = require('./routes/userRoutes');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get('/', (req, res) => {   
    res.send('Hello World!');
});

app.use('/users' ,userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;