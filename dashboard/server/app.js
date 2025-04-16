const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const setupSwagger = require('./swagger/swagger');
const myMiddleware = require('./middleware/myMiddleware');
const authRoutes = require('./routes/AuthRoutes');
const userRoutes = require('./routes/UserRoutes');
const statisticsRoutes = require('./routes/StatisticRoutes');

const app = express();
require('dotenv').config();

// Middleware
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
    }
}));
app.use(myMiddleware);

// Swagger
setupSwagger(app);

// Routes
app.get('/api/active', (req, res) => {
    res.json('Servern är aktiv.');
});


app.use(authRoutes);
app.use(userRoutes);
app.use('/api', statisticsRoutes);

module.exports = app;
