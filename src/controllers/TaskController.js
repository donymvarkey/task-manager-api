import { taskSchema } from '../constants/validations.js';
import {
  createNewTask,
  deleteTask,
  fetchAllTasks,
  fetchTaskDetails,
  taskData,
  updateTaskDetails,
} from '../services/TaskService.js';
import httpResponse from '../utils/httpResponse.js';
import logger from '../utils/logger.js';

const createTask = async (req, res, next) => {
  try {
    const { error } = taskSchema.validate(req.body);

    if (error) {
      logger.error('VALIDATION_ERROR', { meta: { error } });
      return httpResponse(req, res, 400, 'Validation error', error);
    }

    const payload = {
      ...req.body,
      created_by: req.user.user_id,
    };

    const data = await createNewTask(payload);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to create task', null);
    }

    return httpResponse(req, res, 201, 'Task created successfully', data);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const data = await updateTaskDetails(req.body, req.params.taskId);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to update task', null);
    }

    return httpResponse(req, res, 201, 'Task updated successfully', data);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const data = await fetchAllTasks(req.params.projectId);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to fetch tasks', null);
    }

    return httpResponse(req, res, 200, 'Tasks fetched successfully', data);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const data = await fetchTaskDetails(req.params.taskId);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to fetch task', null);
    }

    return httpResponse(req, res, 200, 'Task fetched successfully', data);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const deleteTaskController = async (req, res, next) => {
  try {
    const data = await deleteTask(req.params.taskId);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to delete task', null);
    }

    return httpResponse(req, res, 200, 'Task deleted successfully', data);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const taskMetaData = async (req, res, next) => {
  try {
    const data = await taskData(req.params.projectId);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to fetch task summary', null);
    }

    return httpResponse(
      req,
      res,
      200,
      'Task summary fetched successfully',
      data,
    );
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

export {
  createTask,
  updateTask,
  deleteTaskController,
  getTask,
  getAllTasks,
  taskMetaData,
};
