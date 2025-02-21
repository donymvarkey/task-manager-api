import mongoose from 'mongoose';
import Task from '../models/TaskModel.js';

const createNewTask = async (data) => {
  try {
    const newTask = new Task(data);

    const res = await newTask.save();

    if (!res) {
      return null;
    }

    return res;
  } catch (error) {
    return error;
  }
};

const fetchAllTasks = async (projectId) => {
  try {
    const data = await Task.find({ project: projectId })
      .populate({
        path: 'created_by',
        select: '-password',
      })
      .populate({
        path: 'assigned_to',
        select: '-password',
      });

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

const fetchTaskDetails = async (taskId) => {
  try {
    const data = await Task.findById(taskId);

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

const updateTaskDetails = async (update, taskId) => {
  try {
    const data = await Task.findByIdAndUpdate(taskId, update);

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

const deleteTask = async (taskId) => {
  try {
    const data = await Task.findByIdAndDelete(taskId);

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

const taskData = async (projectId) => {
  try {
    const result = await Task.aggregate([
      { $match: { project: new mongoose.Types.ObjectId(projectId) } }, // Match tasks by project ID
      {
        $group: {
          _id: '$project',
          totalTasks: { $sum: 1 }, // Count all tasks
          completedTasks: { $sum: { $cond: [{ $eq: ['$status', 2] }, 1, 0] } }, // Count completed tasks
        },
      },
      {
        $project: {
          _id: 0,
          totalTasks: 1,
          completedTasks: 1,
          completionPercentage: {
            $cond: [
              { $eq: ['$totalTasks', 0] }, // Avoid division by zero
              0,
              {
                $multiply: [
                  { $divide: ['$completedTasks', '$totalTasks'] },
                  100,
                ],
              },
            ],
          },
        },
      },
    ]);

    return result.length > 0
      ? result[0]
      : { totalTasks: 0, completedTasks: 0, completionPercentage: 0 };
  } catch (error) {
    return error;
  }
};

export {
  createNewTask,
  fetchAllTasks,
  fetchTaskDetails,
  updateTaskDetails,
  deleteTask,
  taskData,
};
