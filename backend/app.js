const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./DB/connectDB');
const captainRoute = require('./routes/captainRoute');
const userRoutes = require('./routes/userRoutes');

connectDB();

app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173', // Allow only frontend requests
    methods: 'GET,POST,PUT,DELETE',  // Allowed request methods
    allowedHeaders: 'Content-Type,Authorization'
  }));
  
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get('/', (req, res) => {   
    res.send('Hello World!');
});

app.use('/users' ,userRoutes);
app.use('/captains', captainRoute);

module.exports = app;