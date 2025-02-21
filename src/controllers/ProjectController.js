import logger from '../utils/logger.js';
import httpResponse from '../utils/httpResponse.js';
import { projectSchema } from '../constants/validations.js';
import {
  createNewProject,
  deleteProjectById,
  getAllUserProjects,
  getProjectById,
  setProjectAsCurrent,
  updateMembersArray,
  updateProjectById,
} from '../services/ProjectService.js';

const createProject = async (req, res, next) => {
  try {
    const { error } = projectSchema.validate(req.body);

    if (error) {
      return httpResponse(req, res, 400, 'Validation failed', error.message);
    }

    const data = {
      ...req.body,
      admin: req.user.user_id,
      members: [req.user.user_id],
    };

    const project = await createNewProject(data);

    if (!project) {
      return httpResponse(req, res, 400, 'Failed to create project.', null);
    }

    return httpResponse(req, res, 201, 'Project created successfully', project);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const data = await updateProjectById(req.body, projectId, req.user.user_id);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to update project.', null);
    }

    return httpResponse(req, res, 200, 'Project updated successfully', data);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const data = await deleteProjectById(projectId, req.user.user_id);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to delete project.', null);
    }

    return httpResponse(req, res, 200, 'Project delete successfully', data);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const fetchProjectDetails = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const data = await getProjectById(projectId);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to fetch project.', null);
    }

    return httpResponse(
      req,
      res,
      200,
      'Project details fetched successfully',
      data,
    );
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const fetchProjectsByUser = async (req, res, next) => {
  try {
    const data = await getAllUserProjects(req.user.user_id);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to fetch projects', null);
    }

    return httpResponse(req, res, 200, 'Projects fetched successfully', data);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const setCurrentProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const data = await setProjectAsCurrent(projectId, req.user.user_id);

    if (!data) {
      return httpResponse(
        req,
        res,
        400,
        'Failed to set project as active',
        null,
      );
    }

    return httpResponse(req, res, 200, 'Project set as active', data);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const memberOperations = async (req, res, next) => {
  try {
    const [operation, projectId] = req.params;
    const { userIdArray } = req.body;

    if (userIdArray.length === 0) {
      return httpResponse(req, res, 400, 'No user id provided', null);
    }

    const data = await updateMembersArray(projectId, userIdArray, operation);

    if (!data) {
      return httpResponse(req, res, 400, `Failed to ${operation} member`, null);
    }

    return httpResponse(req, res, 200, `Member ${operation} success`, data);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

export {
  createProject,
  updateProject,
  deleteProject,
  fetchProjectDetails,
  fetchProjectsByUser,
  setCurrentProject,
  memberOperations,
};
