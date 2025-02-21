import mongoose from 'mongoose';
import Organization from '../models/OrganizationModel.js';
import { cryptoRandomInt } from '../utils/common.js';

const createNewOrg = async (name, userId) => {
  try {
    const newOrg = new Organization({
      name: name,
      owner: userId,
      members: [userId],
    });
    const orgData = await newOrg.save();

    if (!orgData) {
      return null;
    }

    return orgData;
  } catch (error) {
    return error;
  }
};

const updateOrg = async (name, orgId) => {
  try {
    const data = await Organization.findByIdAndUpdate(orgId, { name: name });
    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

const getOrgById = async (orgId) => {
  try {
    // const data = await Organization.findById(orgId);
    const data = await Organization.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(orgId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'ownerDetails',
        },
      },
      { $unwind: '$ownerDetails' },
      {
        $project: {
          name: 1,
          owner: {
            _id: '$ownerDetails._id',
            name: '$ownerDetails.name',
            email: '$ownerDetails.email',
          },
          memberCount: { $size: '$members' },
        },
      },
    ]);

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

const getAllOrgsByOwnerId = async (ownerId) => {
  try {
    const data = await Organization.find({ owner: ownerId });

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

const deleteOrgById = async (orgId) => {
  try {
    const data = await Organization.findByIdAndDelete(orgId);

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

const getOrgMembers = async (orgId, page) => {
  try {
    const members = await Organization.findById(orgId)
      .select('members')
      .populate({
        path: 'members',
        select: '-password',
        options: { limit: 8, skip: 8 * (page - 1) },
      });

    if (!members) {
      return null;
    }

    return members;
  } catch (error) {
    return error;
  }
};

const joinToOrg = async (orgId, userId) => {
  try {
    const org = await Organization.findByIdAndUpdate(orgId, {
      $addToSet: { members: userId },
    });

    if (!org) {
      throw new Error('Invalid or expired invite code');
    }

    if (!org) {
      throw new Error('Failed to join organization');
    }

    return org;
  } catch (error) {
    return error;
  }
};

const createInviteCode = async (orgId) => {
  try {
    const inviteCode = cryptoRandomInt();
    const data = await Organization.findByIdAndUpdate(orgId, {
      inviteCode: inviteCode,
    });

    if (!data) {
      throw new Error('Failed to create invite code');
    }

    return inviteCode;
  } catch (error) {
    return error;
  }
};

export {
  createNewOrg,
  updateOrg,
  getAllOrgsByOwnerId,
  getOrgById,
  deleteOrgById,
  getOrgMembers,
  joinToOrg,
  createInviteCode,
};
