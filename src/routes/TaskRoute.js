import { Router } from 'express';
import { isAuthorized } from '../middlewares/Auth.middleware.js';
import {
  createTask,
  deleteTaskController,
  getAllTasks,
  getTask,
  taskMetaData,
  updateTask,
} from '../controllers/TaskController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: New Task
 *               description:
 *                 type: string
 *                 description: The description of the task
 *                 example: This is a new task
 *               project:
 *                 type: string
 *                 description: The id of the project which the task belongs to
 *               type:
 *                 type: number
 *                 description: Type of task
 *                 example: Feature, Bug...
 *               priority:
 *                 type: number
 *                 description: Priority of the task
 *                 example: LOW, MEDIUM, HIGH, CRITICAL // 0, 1, 2, 3
 *               assigned_to:
 *                 type: string
 *                 description: The id of the person which the task belongs to
 *               created_by:
 *                 type: string
 *                 description: The id of the person who created the task
 *               start_date:
 *                 type: string
 *                 description: Start date of the task
 *               end_date:
 *                 type: string
 *                 description: End date of the task
 *               media:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Any media files to be attached in the task
 *
 *             required:
 *               - title
 *               - description
 *               - project
 *               - type
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', isAuthorized, createTask);

/**
 * @swagger
 * /api/task/all/{projectId}:
 *   get:
 *     summary: Get all tasks for a project
 *     security:
 *       - bearerAuth: []
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/all/:projectId', isAuthorized, getAllTasks);

/**
 * @swagger
 * /api/task/{taskId}:
 *   get:
 *     summary: Get a task by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task details
 */
router.get('/:taskId', isAuthorized, getTask);

/**
 * @swagger
 * /api/task/{taskId}:
 *   patch:
 *     summary: Update a task by ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: New Task
 *               description:
 *                 type: string
 *                 description: The description of the task
 *                 example: This is a new task
 *               project:
 *                 type: string
 *                 description: The id of the project which the task belongs to
 *               type:
 *                 type: number
 *                 description: Type of task
 *                 example: Feature, Bug...
 *               priority:
 *                 type: number
 *                 description: Priority of the task
 *                 example: LOW, MEDIUM, HIGH, CRITICAL // 0, 1, 2, 3
 *               assigned_to:
 *                 type: string
 *                 description: The id of the person which the task belongs to
 *               created_by:
 *                 type: string
 *                 description: The id of the person who created the task
 *               start_date:
 *                 type: string
 *                 description: Start date of the task
 *               end_date:
 *                 type: string
 *                 description: End date of the task
 *               media:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Any media files to be attached in the task
 *
 *             required:
 *               - title
 *               - description
 *               - project
 *               - type
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.patch('/:taskId', isAuthorized, updateTask);

/**
 * @swagger
 * /api/task/{taskId}:
 *   delete:
 *     summary: Delete a task by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete('/:taskId', isAuthorized, deleteTaskController);

/**
 * @swagger
 * /api/task/summary/{projectId}:
 *   get:
 *     summary: Summary of the project
 *     security:
 *       - bearerAuth: []
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Task summary fetched successfully
 */
router.get('/summary/:projectId', taskMetaData);

export default router;
