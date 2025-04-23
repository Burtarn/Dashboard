const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Dokumentation',
            version: '1.0.0',
            description: 'API för min applikation',
        },
        servers: [
            {
                url: `http://localhost:3000`, 
            },
        ],
    },
    apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId
 *         name:
 *           type: string
 *           description: Namnet på användaren
 *         startDate:
 *           type: string
 *           example: "2022-08"
 *           description: Datum då användaren började (YYYY-MM)
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - startDate
 *       properties:
 *         name:
 *           type: string
 *           description: Namnet på användaren
 *         startDate:
 *           type: string
 *           example: "2022-08"
 *           description: Datum då användaren började (YYYY-MM)
 */

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
 *           description: MongoDB ID
 *         date:
 *           type: string
 *           example: "2024-11"
 *         month:
 *           type: string
 *           example: "November"
 *         revenue:
 *           type: number
 *           example: 105000
 *         estimated:
 *           type: number
 *           example: 102000
 *         productsSold:
 *           type: integer
 *           example: 1300
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Skapad tidpunkt
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Senast uppdaterad
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ID
 *         userId:
 *           type: string
 *           description: Användarens ID
 *         name:
 *           type: string
 *           description: Namnet på profilen
 *         startDate:
 *           type: string
 *           example: "2022-08"
 *           description: Startdatum för användaren (YYYY-MM)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ProfileInput:
 *       type: object
 *       required:
 *         - userId
 *         - name
 *         - startDate
 *       properties:
 *         userId:
 *           type: string
 *         name:
 *           type: string
 *         startDate:
 *           type: string
 *           example: "2022-08"
 */


module.exports = setupSwagger;