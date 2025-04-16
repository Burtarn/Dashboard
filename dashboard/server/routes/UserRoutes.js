const express = require('express');
const router = express.Router();
const User = require('../models/User');




// GET – Hämta alla användare

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Hämta alla användare
 *     responses:
 *       200:
 *         description: En lista över användare.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */



router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Fel vid hämtning av användare' });
  }
});

// POST – Skapa användare

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Skapa en ny användare
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Användare skapad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Ogiltig indata
 */

router.post('/api/users', async (req, res) => {
  const { name, startDate } = req.body;

  if (!name || !startDate) {
    return res.status(400).json({ message: 'Namn och startDate krävs' });
  }

  try {
    const newUser = new User({ name, startDate });
    await newUser.save();
    res.status(201).json({ message: 'Användare skapad.', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Fel vid skapande av användare' });
  }
});



// GET – Hämta en användare

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Hämta en användare per ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId för användaren
 *     responses:
 *       200:
 *         description: Användare hittad.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Användare ej hittad.
 */

router.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Användare ej hittad.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Fel vid hämtning av användare' });
  }
});

// PUT – Uppdatera användare

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Uppdatera en användare per ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId för användaren
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Användare uppdaterad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Användare ej hittad.
 */

router.put('/api/users/:id', async (req, res) => {
  try {
    const { name, startDate } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, startDate },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: 'Användare ej hittad.' });
    res.json({ message: 'Användare uppdaterad.', user });
  } catch (err) {
    res.status(500).json({ message: 'Fel vid uppdatering av användare' });
  }
});

// DELETE – Ta bort användare

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Ta bort en användare per ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId för användaren
 *     responses:
 *       204:
 *         description: Användare borttagen.
 *       404:
 *         description: Användare ej hittad.
 */

router.delete('/api/users/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Användare ej hittad.' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Fel vid borttagning av användare' });
  }
});

module.exports = router;
