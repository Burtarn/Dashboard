const express = require('express');
const router = express.Router();

let users = [
    { id: 1, name: 'Användare 1' },
    { id: 2, name: 'Användare 2' },
    { id: 3, name: 'Användare 3' },
    { id: 4, name: 'Användare 4' },
    { id: 5, name: 'Användare 5' },
];

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
    res.json(users);
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
    const newUser = {
        id: users.length + 1, 
        name: req.body.name,
    };
    users.push(newUser);
    res.status(201).json({ message: 'Användare skapad.', user: newUser });
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Hämta en användare per ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID på användaren
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Användare hittad.
 *       404:
 *         description: Användare ej hittad.
 */
router.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'Användare ej hittad.' });
    res.json(user);
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Ändra en användare per ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID på användaren
 *         schema:
 *           type: integer
 *       - name: body
 *         in: body
 *         required: true
 *         description: Användardata att uppdatera
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: Användare uppdaterad.
 *       404:
 *         description: Användare ej hittad.
 */
router.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'Användare ej hittad.' });

    user.name = req.body.name;
    res.json({ message: 'Användare uppdaterad.', user });
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Ta bort en användare per ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID på användaren
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Användare borttagen.
 *       404:
 *         description: Användare ej hittad.
 */
router.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'Användare ej hittad.' });

    users.splice(userIndex, 1);
    res.status(204).send(); 
});

module.exports = router;