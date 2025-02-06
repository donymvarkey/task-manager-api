import { Router } from 'express';
import { isAuthorized } from '../middlewares/Auth.middleware.js';
import { loggedInUserProfile } from '../controllers/UserController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Retrieve the current user's information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 email:
 *                   type: string
 *                   description: The user's email
 *       401:
 *         description: Unauthorized, invalid or missing token
 */
router.get('/me', isAuthorized, loggedInUserProfile);

export default router;
