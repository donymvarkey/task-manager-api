import logger from '../utils/logger.js';
import { loginSchema, registrationSchema } from '../constants/validations.js';
import httpResponse from '../utils/httpResponse.js';
import { createUser, loginService } from '../services/AuthService.js';
import { generateAccessToken } from '../utils/common.js';
import { createNewOrg } from '../services/OrganizationService.js';

const signUp = async (req, res, next) => {
  try {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return httpResponse(req, res, 400, 'Validation Error', {
        error,
        data: req.body,
      });
    }

    const data = await createUser(req.body);

    if (!data) {
      return httpResponse(req, res, 400, 'User registration failed', null);
    }

    const defaultOrgName = `${data?.name.replace(/\s+/g, '').toLowerCase()}'s org`;

    const org = await createNewOrg(defaultOrgName, data?._id);

    if (!org) {
      logger.error('OPERATION_FAILURE', {
        meta: { message: 'Failed to create organization entry' },
      });
    }

    return httpResponse(req, res, 201, 'User registration successful');
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return httpResponse(req, res, 400, 'Validation Error', error);
    }

    const { email, password } = req.body;

    const user = await loginService(email, password);

    if (!user) {
      return httpResponse(
        req,
        res,
        400,
        'Invalid credentials or user not found',
        null,
      );
    }

    const payload = {
      email,
      user_id: user?._id,
    };

    const token = generateAccessToken(payload);

    return httpResponse(req, res, 200, 'Login Success', {
      ...payload,
      access_token: token,
    });
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

export { signIn, signUp };
