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

module.exports = setupSwagger;