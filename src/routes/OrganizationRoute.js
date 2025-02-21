import { Router } from 'express';
import { isAuthorized } from '../middlewares/Auth.middleware.js';
import {
  createOrg,
  createOrgJoinCode,
  deleteOrg,
  getAllOrgMembers,
  getOrgByOrgID,
  getOrgsByOwnerID,
  joinOrg,
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

/**
 * @swagger
 * /api/organization/members/{orgId}:
 *   get:
 *     summary: Get organizations members
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orgId
 *         schema:
 *           type: string
 *         required: true
 *         description: Organization ID
 *     responses:
 *       200:
 *         description: Members retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get('/members/:orgId', isAuthorized, getAllOrgMembers);

/**
 * @swagger
 * /api/organization/join:
 *   post:
 *     summary: Join a new organization
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
 *               inviteCode:
 *                 type: string
 *     responses:
 *       201:
 *         description: Organization joined successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/join', isAuthorized, joinOrg);

/**
 * @swagger
 * /api/organization/create/code/{orgId}:
 *   get:
 *     summary: Join a new organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orgId
 *         schema:
 *           type: string
 *         required: true
 *         description: Organization ID
 *     responses:
 *       201:
 *         description: Organization joined successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get('/create/code/:orgId', isAuthorized, createOrgJoinCode);

export default router;
