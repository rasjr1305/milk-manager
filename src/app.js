import express from 'express';
import farmRoutes from './api/routes/Farm.js';
import farmerRoutes from './api/routes/Farmer.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API to manage farms and related information.',
      version: '1.0.0',
    },
  },
  apis: ['./api/routes/*.js'],
});
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use('/api/v1/', farmRoutes);
app.use('/api/v1/', farmerRoutes);

export default app;