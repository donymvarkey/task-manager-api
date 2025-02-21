import { MEMBER_OPERATIONS } from '../constants/application.js';
import Project from '../models/ProjectModel.js';

const createNewProject = async (data) => {
  try {
    const userProjects = await getAllUserProjects(data?.admin);
    if (userProjects.length >= 1) {
      data['isCurrent'] = true;
      await Project.updateMany(
        { admin: data?.admin },
        { $set: { isCurrent: false } },
      );
    }
    const newProject = new Project(data);
    const project = await newProject.save();

    if (!project) {
      return null;
    }

    return project;
  } catch (error) {
    return error;
  }
};

const updateProjectById = async (update, projectId, userId) => {
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return null;
    }

    if (project.admin.toString() !== userId) {
      throw new Error('Unauthorized: Only the creator can update the project');
    }
    const data = await Project.findByIdAndUpdate(projectId, update);

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

const deleteProjectById = async (projectId, userId) => {
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return null;
    }

    if (project.admin.toString() !== userId) {
      throw new Error('Unauthorized: Only the creator can delete the project');
    }

    const data = await Project.findByIdAndDelete(projectId);

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

const getProjectById = async (projectId) => {
  try {
    const data = await Project.findById(projectId);

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

const getAllUserProjects = async (userId) => {
  try {
    const data = await Project.find({ admin: userId });

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

const setProjectAsCurrent = async (projectId, userId) => {
  try {
    const projects = await getAllUserProjects(userId);
    if (projects.length >= 1) {
      await Project.updateMany(
        { admin: userId },
        { $set: { isCurrent: false } },
      );
    }
    const project = await Project.findByIdAndUpdate(projectId, {
      isCurrent: true,
    });

    if (!project) {
      return null;
    }

    return project;
  } catch (error) {
    return error;
  }
};

const updateMembersArray = async (projectId, userIds, type) => {
  try {
    let query;

    if (type === MEMBER_OPERATIONS.ADD) {
      query = {
        $addToSet: { members: { $each: userIds } },
      };
    } else {
      query = {
        $pull: { members: { $in: userIds } },
      };
    }
    const data = await Project.findByIdAndUpdate(projectId, query, {
      new: true,
    });

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

export {
  createNewProject,
  updateProjectById,
  deleteProjectById,
  getAllUserProjects,
  getProjectById,
  setProjectAsCurrent,
  updateMembersArray,
};
