import { getUserProfile } from '../services/UserService.js';
import httpResponse from '../utils/httpResponse.js';
import logger from '../utils/logger.js';

const loggedInUserProfile = async (req, res, next) => {
  try {
    const user = await getUserProfile(req?.user.user_id);

    if (!user) {
      return httpResponse(req, res, 400, 'Failed to get user profile', null);
    }

    return httpResponse(req, res, 200, 'Fetched user profile', user);
  } catch (error) {
    logger.error('SERVER_ERROR', { meta: { message: error.message } });
    next(error);
  }
};

export { loggedInUserProfile };
