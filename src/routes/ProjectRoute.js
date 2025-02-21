import { Router } from 'express';
import { isAuthorized } from '../middlewares/Auth.middleware.js';
import {
  createProject,
  deleteProject,
  fetchProjectDetails,
  fetchProjectsByUser,
  memberOperations,
  setCurrentProject,
  updateProject,
} from '../controllers/ProjectController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management APIs
 */

/**
 * @swagger
 * /api/project:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
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
 *                 description: The name of the project
 *                 example: New Project
 *               description:
 *                 type: string
 *                 description: The description of the project
 *                 example: This is a new project
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', isAuthorized, createProject);

/**
 * @swagger
 * /api/project/{projectId}:
 *   put:
 *     summary: Update an existing project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the project
 *                 example: Updated Project
 *               description:
 *                 type: string
 *                 description: The description of the project
 *                 example: This is an updated project
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The IDs of the project members
 *                 example: [60d0fe4f5311236168a109cb, 60d0fe4f5311236168a109cc]
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */
router.put('/:projectId', isAuthorized, updateProject);

/**
 * @swagger
 * /api/project/{projectId}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to delete
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */
router.delete('/:projectId', isAuthorized, deleteProject);

/**
 * @swagger
 * /api/project/{projectId}:
 *   get:
 *     summary: Get project details
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to retrieve
 *     responses:
 *       200:
 *         description: Project details retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */
router.get('/:projectId', isAuthorized, fetchProjectDetails);

/**
 * @swagger
 * /api/project/user/list:
 *   get:
 *     summary: Get projects by user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/user/list', isAuthorized, fetchProjectsByUser);

/**
 * @swagger
 * /api/project/current/{projectId}:
 *   get:
 *     summary: Set project as active
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to set as active
 *     responses:
 *       200:
 *         description: Project set as active successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */
router.get('/current/:projectId', isAuthorized, setCurrentProject);

/**
 * @swagger
 * /api/project/member/{operation}/{projectId}:
 *   post:
 *     summary: Add a member to a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to set as active
 *     responses:
 *       200:
 *         description: Project set as active successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */
router.post('/member/:operation/:projectId', isAuthorized, memberOperations);

export default router;
