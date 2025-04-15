const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logga in användare
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inloggning lyckades
 *       401:
 *         description: Fel användarnamn eller lösenord
 */
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

/**
 * @swagger
 * /auth/check-auth:
 *   get:
 *     summary: Kontrollera om användaren är inloggad
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Inloggningsstatus
 *       401:
 *         description: Användaren är inte inloggad
 */
router.get('/check-auth', (req, res) => {
    if (req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logga ut användare
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Utloggning lyckades
 *       500:
 *         description: Fel vid utloggning
 */
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Kunde inte logga ut' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Utloggad' });
    });
});

module.exports = router;
