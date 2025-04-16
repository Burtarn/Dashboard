const express = require('express');
const router = express.Router();

let statisticsInformation = [
  { id: 1, date: "2024-01", month: 'January', revenue: 102332, estimated: 90000, productsSold: 1250 },
  { id: 2, date: "2024-02", month: 'February', revenue: 94320, estimated: 95000, productsSold: 1180 },
  { id: 3, date: "2024-03", month: 'March', revenue: 110456, estimated: 105000, productsSold: 1395 },
  { id: 4, date: "2024-04", month: 'April', revenue: 98750, estimated: 99000, productsSold: 1220 },
  { id: 5, date: "2024-05", month: 'May', revenue: 123000, estimated: 120000, productsSold: 1505 },
  { id: 6, date: "2024-06", month: 'June', revenue: 111220, estimated: 115000, productsSold: 1370 },
  { id: 7, date: "2024-07", month: 'July', revenue: 119876, estimated: 118000, productsSold: 1452 },
  { id: 8, date: "2024-08", month: 'August', revenue: 108500, estimated: 112000, productsSold: 1320 },
  { id: 9, date: "2024-09", month: 'September', revenue: 95000, estimated: 97000, productsSold: 1150 },
  { id: 10, date: "2024-10", month: 'October', revenue: 101345, estimated: 100000, productsSold: 1218 },
];

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     summary: Hämta all statistik
 *     responses:
 *       200:
 *         description: En lista över all statistik.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   date:
 *                     type: string
 *                   month:
 *                     type: string
 *                   revenue:
 *                     type: number
 *                   estimated:
 *                     type: number
 *                   productsSold:
 *                     type: integer
 */
router.get('/statistics', (req, res) => {
    res.json(statisticsInformation);
});


/**
 * @swagger
 * /api/statistics/{id}:
 *   get:
 *     summary: Hämta en specifik statistikpost baserat på ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID för statistikposten som ska hämtas
 *     responses:
 *       200:
 *         description: Statistikpost hittades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 date:
 *                   type: string
 *                 month:
 *                   type: string
 *                 revenue:
 *                   type: number
 *                 estimated:
 *                   type: number
 *                 productsSold:
 *                   type: integer
 *       404:
 *         description: Statistikpost med angivet ID hittades inte
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Statistik med angivet ID hittades inte.
 */

router.get('/statistics/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const statistic = statisticsInformation.find(s => s.id === id);

  if (!statistic) {
    return res.status(404).json({ message: 'Statistik med angivet ID hittades inte.' });
  }

  res.json(statistic);
});

/**
 * @swagger
 * /api/statistics:
 *   post:
 *     summary: Lägg till en ny statistikpost
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - month
 *               - revenue
 *               - estimated
 *               - productsSold
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2024-11"
 *               month:
 *                 type: string
 *                 example: "November"
 *               revenue:
 *                 type: number
 *                 example: 105000
 *               estimated:
 *                 type: number
 *                 example: 102000
 *               productsSold:
 *                 type: integer
 *                 example: 1300
 *     responses:
 *       201:
 *         description: Statistikpost skapades
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistic'
 *       400:
 *         description: Ogiltig indata
 */


router.post('/statistics', (req, res) => {
  const { date, month, revenue, estimated, productsSold } = req.body;

  if (!date || !month || !revenue || !estimated || !productsSold) {
    return res.status(400).json({ message: 'Alla fält måste anges.' });
  }

  const newStatistic = {
    id: statisticsInformation.length ? statisticsInformation[statisticsInformation.length - 1].id + 1 : 1,
    date,
    month,
    revenue,
    estimated,
    productsSold
  };

  statisticsInformation.push(newStatistic);
  res.status(201).json(newStatistic);
});


/**
 * @swagger
 * /api/statistics/{id}:
 *   delete:
 *     summary: Ta bort en statistikpost med ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID på statistikposten som ska tas bort
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
 *         description: Statistikpost med angivet ID hittades inte
 */
router.delete('/statistics/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = statisticsInformation.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Statistikpost med angivet ID hittades inte.' });
  }

  const deleted = statisticsInformation.splice(index, 1);
  res.json({ message: 'Statistikpost borttagen.', deleted: deleted[0] });
});

/**
 * @swagger
 * /api/statistics/{id}:
 *   put:
 *     summary: Uppdatera en statistikpost baserat på ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID för statistikposten som ska uppdateras
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - month
 *               - revenue
 *               - estimated
 *               - productsSold
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2024-12"
 *               month:
 *                 type: string
 *                 example: "December"
 *               revenue:
 *                 type: number
 *                 example: 120000
 *               estimated:
 *                 type: number
 *                 example: 118000
 *               productsSold:
 *                 type: integer
 *                 example: 1400
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
 *         description: Statistikpost med angivet ID hittades inte
 */
router.put('/statistics/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { date, month, revenue, estimated, productsSold } = req.body;

  const index = statisticsInformation.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Statistikpost med angivet ID hittades inte.' });
  }

  if (!date || !month || !revenue || !estimated || !productsSold) {
    return res.status(400).json({ message: 'Alla fält måste anges.' });
  }

  const updatedStatistic = {
    id,
    date,
    month,
    revenue,
    estimated,
    productsSold
  };

  statisticsInformation[index] = updatedStatistic;
  res.json(updatedStatistic);
});




module.exports = router;
