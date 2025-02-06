import { Router } from 'express';
import { isAuthorized } from '../middlewares/Auth.middleware.js';
import {
  createOrg,
  deleteOrg,
  getOrgByOrgID,
  getOrgsByOwnerID,
} from '../controllers/OrganizationController.js';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Organization management
 */

/**
 * @swagger
 * /api/organization/new:
 *   post:
 *     summary: Create a new organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Organization"
 *     responses:
 *       201:
 *         description: Organization created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/new', isAuthorized, createOrg);

/**
 * @swagger
 * /api/organization/{orgId}:
 *   delete:
 *     summary: Delete an organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orgId
 *         schema:
 *           type: string
 *         required: true
 *         description: The organization ID
 *     responses:
 *       200:
 *         description: Organization deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.delete('/:orgId', isAuthorized, deleteOrg);

/**
 * @swagger
 * /api/organization/{orgId}:
 *   get:
 *     summary: Get organization by ID
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orgId
 *         schema:
 *           type: string
 *         required: true
 *         description: The organization ID
 *     responses:
 *       200:
 *         description: Organization retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get('/:orgId', isAuthorized, getOrgByOrgID);

/**
 * @swagger
 * /api/organization/owner/{ownerId}:
 *   get:
 *     summary: Get organizations by owner ID
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         schema:
 *           type: string
 *         required: true
 *         description: The owner ID
 *     responses:
 *       200:
 *         description: Organizations retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get('/owner/:ownerId', isAuthorized, getOrgsByOwnerID);

export default router;
