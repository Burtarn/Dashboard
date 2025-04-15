const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Hämta alla användare
 *     responses:
 *       200:
 *         description: En lista över användare.
 */
router.get('/api/users', (req, res) => {
    res.json([{ id: 1, name: 'Användare 1' }, { id: 2, name: 'Användare 2' }]);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Skapa en ny användare
 *     responses:
 *       201:
 *         description: Användare skapad.
 */
router.post('/api/users', (req, res) => {
    // Här kan du lägga till logik för att skapa en användare
    res.status(201).json({ message: 'Användare skapad.' });
});

module.exports = router;