const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const setupSwagger = require('./swagger/swagger'); 
const app = express();

require('dotenv').config();
console.log('🔍 MONGO_URI:', process.env.MONGO_URI);

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

setupSwagger(app);

app.get('/api/active', (req, res) => {
    res.json('Servern är aktiv.');
});

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('Ansluten till MongoDB'))
    .catch((err) => console.error('MongoDB-anslutningsfel:', err));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
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

const authRoutes = require('./routes/AuthRoutes');
app.use(authRoutes);

const userRoutes = require('./routes/UserRoutes'); // Lägg till denna rad
app.use(userRoutes); // Lägg till denna rad

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servern körs på port ${PORT}`);
});