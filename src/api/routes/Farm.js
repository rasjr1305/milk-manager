import express from 'express';
import FarmController from '../controllers/FarmController.js';

const router = express.Router();

/**
 * @openapi
 * /farm:
 *   post:
 *     summary: Create a new Farm
 *     description: This endpoint allows users to create a new Farm by providing necessary details.
 *     tags: [Farms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the Farm.
 *               farmer:
 *                 type: string
 *                 description: The name of the farmer who owns the Farm.
 *               distance:
 *                 type: number
 *                 description: The distance of the Farm from a specific location (e.g., city center) in kilometers.
 *             required:
 *               - name
 *               - farmer
 *               - distance
 *     responses:
 *       '201':
 *         description: Farm created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the created Farm.
 *                 name:
 *                   type: string
 *                   description: The name of the Farm.
 *                 farmer:
 *                   type: string
 *                   description: The name of the farmer who owns the Farm.
 *                 distance:
 *                   type: number
 *                   description: The distance of the Farm from a specific location (e.g., city center) in kilometers.
 *       '400':
 *         description: Invalid entries. Try Again.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 */
router.post('/farm', FarmController.create);

/**
 * @openapi
 * /farm/{id}/milk-production:
 *   post:
 *     summary: Record milk production for a farm
 *     description: This endpoint allows users to record milk production for a specific farm by providing the farm ID along with the amount of milk produced and the date of production.
 *     tags: [Milk Production]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the farm for which milk production is being recorded.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount of milk produced in liters.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of milk production (YYYY-MM-DD).
 *             required:
 *               - amount
 *               - date
 *     responses:
 *       '201':
 *         description: Milk production recorded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the created milk production record.
 *                 farm:
 *                   type: string
 *                   description: The ID of the farm for which milk production is recorded.
 *                 amount:
 *                   type: number
 *                   description: The amount of milk produced in liters.
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: The date of milk production (YYYY-MM-DD).
 *       '400':
 *         description: Invalid entries. Try Again.
 *       '404':
 *         description: Farm not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 */
router.post('/farm/:id/milk-production', FarmController.addMilkProduction);

/**
 * @openapi
 * /farm/{id}/milk-production:
 *   get:
 *     summary: Get milk production records for a farm
 *     description: This endpoint allows users to retrieve milk production records for a specific farm identified by the farm ID and the month. It returns a JSON array with milk production data and the average milk production for the specified month.
 *     tags: [Milk Production]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the farm for which milk production records are being retrieved.
 *         required: true
 *         schema:
 *           type: string
 *       - name: month
 *         in: query
 *         description: The month for which milk production records are being retrieved (e.g., "1", "2", "3").
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Milk production records retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID representing the specified month.
 *                       amount:
 *                         type: number
 *                         description: The amount of milk produced in liters.
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: The date of milk production (YYYY-MM-DD).
 *                       farm:
 *                         type: string
 *                         description: The ID of the farm for which milk production is recorded.
 *                 avg:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       amount:
 *                         type: number
 *                         description: The average amount of milk produced in liters for the specified month.
 *                       _id:
 *                         type: string
 *                         description: The ID representing the specified month.
 *       '400':
 *         description: Invalid entries. Try Again.
 *       '404':
 *         description: Farm Production not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 */
router.get('/farm/:id/milk-production', FarmController.getMilkProduction);

/**
 * @openapi
 * /farm/{id}/milk-price-report:
 *   get:
 *     summary: Get milk price report for a farm
 *     description: This endpoint allows users to generate a milk price report for a specific farm identified by the farm ID and the month and year parameters. The report provides the price per liter of milk paid for each month of the specified year for the given farm.
 *     tags: [Milk Price Report]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the farm for which the milk price report is being generated.
 *         required: true
 *         schema:
 *           type: string
 *       - name: month
 *         in: query
 *         description: The month for which the milk price report is being generated (e.g., "1", "2", "3").
 *         required: false
 *         schema:
 *           type: string
 *       - name: year
 *         in: query
 *         description: The year for which the milk price report is being generated (e.g., "2023").
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Milk price report generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                     description: The month for which the milk price is reported (e.g., "July").
 *                   price_br:
 *                     type: string
 *                     description: The price per liter of milk in Brazilian numeric format.
 *                   price_en:
 *                     type: string
 *                     description: The price per liter of milk in English numeric format.
 *       '400':
 *         description: Invalid entries. Try Again.
 *       '404':
 *         description: Farm Production not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 */
router.get('/farm/:id/milk-price-report', FarmController.getMilkPriceReport);

export default router;