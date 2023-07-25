import express from 'express';
import FarmerController from '../controllers/FarmerController.js';

const router = express.Router();

/**
 * @openapi
 * /farmer:
 *   post:
 *     summary: Create a new farmer
 *     description: This endpoint allows users to create a new farmer by providing necessary details.
 *     tags: [Farmers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the farmer.
 *               email:
 *                 type: string
 *                 description: The email address of the farmer.
 *               password:
 *                 type: string
 *                 description: The password for the farmer's account.
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Farmer created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the created farmer.
 *                 name:
 *                   type: string
 *                   description: The name of the farmer.
 *                 email:
 *                   type: string
 *                   description: The email address of the farmer.
 *       '400':
 *         description: Invalid entries. Try Again.
 *       '409':
 *         description: Email already registered.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 */
router.post('/farmer', FarmerController.create);

export default router;