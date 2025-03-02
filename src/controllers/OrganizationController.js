import { organizationSchema } from '../constants/validations.js';
import logger from '../utils/logger.js';
import httpResponse from '../utils/httpResponse.js';
import {
  createNewOrg,
  deleteOrgById,
  getAllOrgsByOwnerId,
  getOrgById,
  getOrgMembers,
  joinToOrg,
} from '../services/OrganizationService.js';
import { cryptoRandomInt } from '../utils/common.js';
import { deleteKey, getKey, setKey } from '../database/Redis.js';

const createOrg = async (req, res, next) => {
  try {
    const { error } = organizationSchema.validate(req.body);

    if (error) {
      return httpResponse(req, res, 400, 'Validation Error', null);
    }

    const { name } = req.body;

    const org = await createNewOrg(name, req?.user?.user_id);

    if (!org) {
      return httpResponse(req, res, 400, 'Failed to create organization', null);
    }

    return httpResponse(req, res, 201, 'Organization created', null);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

// const updateOrg = (req, res, next) => {
//   try {
//   } catch (error) {
//     logger.error('SERVER_ERROR', { meta: { message: error.message } });
//     next(error);
//   }
// };

const deleteOrg = async (req, res, next) => {
  try {
    const { orgId } = req.params;

    const data = await deleteOrgById(orgId);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to delete organization', null);
    }

    return httpResponse(req, res, 200, 'Organization deleted', null);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const getOrgByOrgID = async (req, res, next) => {
  try {
    const { orgId } = req.params;

    const org = await getOrgById(orgId);

    if (!org) {
      return httpResponse(req, res, 400, 'Failed to fetch organization', null);
    }

    return httpResponse(req, res, 200, 'Organization fetched', org);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const getOrgsByOwnerID = async (req, res, next) => {
  try {
    const org = await getAllOrgsByOwnerId(req?.user?.user_id);

    if (!org) {
      return httpResponse(req, res, 400, 'Failed to fetch organization', null);
    }

    return httpResponse(req, res, 200, 'Organization fetched', org);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const getAllOrgMembers = async (req, res, next) => {
  try {
    const { page } = req.query;
    const members = await getOrgMembers(req?.params?.orgId, page);

    if (!members) {
      return httpResponse(req, res, 400, 'Failed to fetch members', null);
    }

    return httpResponse(req, res, 200, 'Members fetched', members);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const joinOrg = async (req, res, next) => {
  try {
    const { inviteCode } = req.body;
    const inviteData = await getKey(inviteCode);

    if (!inviteData) {
      return httpResponse(
        req,
        res,
        400,
        'Invalid or expired invite code',
        null,
      );
    }
    const data = await joinToOrg(inviteData, req?.user?.user_id);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to join organization', null);
    }

    await deleteKey(inviteCode);

    return httpResponse(req, res, 200, 'Organization joined', data);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const createOrgJoinCode = async (req, res, next) => {
  try {
    const { orgId } = req.params;
    const inviteCode = cryptoRandomInt();
    await setKey(inviteCode, orgId);
    return httpResponse(req, res, 200, 'Code generated', { code: inviteCode });
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

export {
  createOrg,
  deleteOrg,
  getOrgByOrgID,
  getOrgsByOwnerID,
  getAllOrgMembers,
  joinOrg,
  createOrgJoinCode,
};
