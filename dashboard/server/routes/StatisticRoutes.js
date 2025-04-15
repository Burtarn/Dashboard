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

module.exports = router;
