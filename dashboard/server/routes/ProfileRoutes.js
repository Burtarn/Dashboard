const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); 

// GET – Hämta alla profiler
/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Hämta alla användarprofiler
 *     responses:
 *       200:
 *         description: En lista över användarprofiler.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 */
router.get('/', async (req, res) => { 
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: 'Fel vid hämtning av profiler' });
  }
});

// POST – Skapa en ny profil
/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Skapa en ny användarprofil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileInput'
 *     responses:
 *       201:
 *         description: Profil skapad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 profile:
 *                   $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Ogiltig indata
 */
router.post('/api/profiles', async (req, res) => {
  const { userId, name, startDate } = req.body;

  if (!userId || !name || !startDate) {
    return res.status(400).json({ message: 'userId, namn och startDate krävs' });
  }

  try {
    const newProfile = new Profile({ userId, name, startDate });
    await newProfile.save();
    res.status(201).json({ message: 'Profil skapad.', profile: newProfile });
  } catch (err) {
    res.status(500).json({ message: 'Fel vid skapande av profil' });
  }
});

// GET – Hämta en profil per ID
/**
 * @swagger
 * /api/profiles/{id}:
 *   get:
 *     summary: Hämta en användarprofil per ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId för profilen
 *     responses:
 *       200:
 *         description: Profil hittad.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profil ej hittad.
 */
router.get('/api/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profil ej hittad.' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Fel vid hämtning av profil' });
  }
});

// PUT – Uppdatera profil per ID
/**
 * @swagger
 * /api/profiles/{id}:
 *   put:
 *     summary: Uppdatera en profil per ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId för profilen
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileInput'
 *     responses:
 *       200:
 *         description: Profil uppdaterad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 profile:
 *                   $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profil ej hittad.
 */
router.put('/api/profiles/:id', async (req, res) => {
  try {
    const { name, startDate } = req.body;
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { name, startDate },
      { new: true, runValidators: true }
    );

    if (!profile) return res.status(404).json({ message: 'Profil ej hittad.' });
    res.json({ message: 'Profil uppdaterad.', profile });
  } catch (err) {
    res.status(500).json({ message: 'Fel vid uppdatering av profil' });
  }
});

// DELETE – Ta bort profil per ID
/**
 * @swagger
 * /api/profiles/{id}:
 *   delete:
 *     summary: Ta bort en profil per ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId för profilen
 *     responses:
 *       204:
 *         description: Profil borttagen.
 *       404:
 *         description: Profil ej hittad.
 */
router.delete('/api/profiles/:id', async (req, res) => {
  try {
    const deleted = await Profile.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Profil ej hittad.' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Fel vid borttagning av profil' });
  }
});

module.exports = router;
