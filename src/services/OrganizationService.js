import Organization from '../models/OrganizationModel.js';

const createNewOrg = async (name, userId) => {
  try {
    const newOrg = new Organization({ name: name, owner: userId });
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
    const data = await Organization.findById(orgId);

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

export {
  createNewOrg,
  updateOrg,
  getAllOrgsByOwnerId,
  getOrgById,
  deleteOrgById,
};
