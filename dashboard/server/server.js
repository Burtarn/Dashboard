require('dotenv').config(); // Ladda miljövariabler från .env

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

// Hämta SECRET_KEY från miljövariabeln
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,  // Tillåt cookies i CORS
}));

app.use(express.json());

app.use(session({
    secret: SECRET_KEY,   // Använd miljövariabeln här
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,      // Sätt till true om du använder HTTPS
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 1 timme
        sameSite: 'Strict', // Förhindra tredjepartsförfrågningar
    },
}));

const users = [
    { username: 'admin', password: '1234' }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.user = user;
        res.status(200).json({ message: 'Inloggning lyckades' });
    } else {
        res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
    }
});

app.get('/check-auth', (req, res) => {
    if (req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Kunde inte logga ut' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Utloggad' });
    });
});

app.listen(3000, () => console.log('Servern körs på port 3000'));
