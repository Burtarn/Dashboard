const express = require('express');
const router = express.Router();
const User = require('../models/User'); 


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        req.session.user = { username: user.username };
        res.status(200).json({ message: 'Inloggning lyckades' });
    } else {
        res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
    }
});


router.get('/check-auth', (req, res) => {
    if (req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Kunde inte logga ut' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Utloggad' });
    });
});

module.exports = router;
