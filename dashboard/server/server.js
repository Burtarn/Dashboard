const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();


require('dotenv').config();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});