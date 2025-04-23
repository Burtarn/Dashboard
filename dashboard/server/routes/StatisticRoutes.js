const express = require('express');
const router = express.Router();
const Statistic = require('../models/Statistics');


/**
 * @swagger
 * components:
 *   schemas:
 *     Statistic:
 *       type: object
 *       required:
 *         - date
 *         - month
 *         - revenue
 *         - estimated
 *         - productsSold
 *       properties:
 *         _id:
 *           type: string
 *         date:
 *           type: string
 *           example: "2024-11"
 *         month:
 *           type: string
 *         revenue:
 *           type: number
 *         estimated:
 *           type: number
 *         productsSold:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * /api/statistics:
 *   get:
 *     summary: Hämta all statistik
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: En lista över all statistik
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statistic'
 */

router.get('/statistics', async (req, res) => {
  try {
    const statistics = await Statistic.find();
    res.json(statistics);
  } catch (err) {
    res.status(500).json({ message: 'Fel vid hämtning av statistik.' });
  }
});

/**
 * @swagger
 * /api/statistics/{id}:
 *   get:
 *     summary: Hämta en specifik statistikpost
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Statistikpostens MongoDB ID
 *     responses:
 *       200:
 *         description: Statistikpost hittades
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistic'
 *       404:
 *         description: Statistikpost hittades inte
 */


router.get('/statistics/:id', async (req, res) => {
  try {
    const statistic = await Statistic.findById(req.params.id);
    if (!statistic) {
      return res.status(404).json({ message: 'Statistikpost med angivet ID hittades inte.' });
    }
    res.json(statistic);
  } catch (err) {
    res.status(500).json({ message: 'Fel vid hämtning av statistikpost.' });
  }
});

/**
 * @swagger
 * /api/statistics:
 *   post:
 *     summary: Skapa en ny statistikpost
 *     tags: [Statistics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Statistic'
 *     responses:
 *       201:
 *         description: Statistikpost skapad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistic'
 *       400:
 *         description: Ogiltig indata
 */


router.post('/statistics', async (req, res) => {
  try {
    const newStatistic = new Statistic(req.body);
    await newStatistic.save();
    res.status(201).json(newStatistic);
  } catch (err) {
    res.status(400).json({ message: 'Ogiltig indata', error: err.message });
  }
});

/**
 * @swagger
 * /api/statistics/{id}:
 *   put:
 *     summary: Uppdatera statistikpost
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Statistikpostens MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Statistic'
 *     responses:
 *       200:
 *         description: Statistikpost uppdaterad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistic'
 *       400:
 *         description: Ogiltig indata
 *       404:
 *         description: Statistikpost hittades inte
 */


router.put('/statistics/:id', async (req, res) => {
  try {
    const updatedStatistic = await Statistic.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedStatistic) {
      return res.status(404).json({ message: 'Statistikpost med angivet ID hittades inte.' });
    }
    res.json(updatedStatistic);
  } catch (err) {
    res.status(400).json({ message: 'Ogiltig indata', error: err.message });
  }
});

/**
 * @swagger
 * /api/statistics/{id}:
 *   delete:
 *     summary: Ta bort en statistikpost
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Statistikpostens MongoDB ID
 *     responses:
 *       200:
 *         description: Statistikpost borttagen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deleted:
 *                   $ref: '#/components/schemas/Statistic'
 *       404:
 *         description: Statistikpost hittades inte
 */


router.delete('/statistics/:id', async (req, res) => {
  try {
    const deletedStatistic = await Statistic.findByIdAndDelete(req.params.id);
    if (!deletedStatistic) {
      return res.status(404).json({ message: 'Statistikpost med angivet ID hittades inte.' });
    }
    res.json({ message: 'Statistikpost borttagen.', deleted: deletedStatistic });
  } catch (err) {
    res.status(500).json({ message: 'Fel vid borttagning av statistikpost.' });
  }
});

module.exports = router;
