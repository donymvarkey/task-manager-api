import Organization from '../models/OrganizationModel.js';
import User from '../models/UserModel.js';

const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    const org = await Organization.findOne({ owner: userId }).populate({
      path: 'owner',
      select: '-password',
    });

    if (!user || !org) {
      return null;
    }

    return {
      user,
      org,
    };
  } catch (error) {
    return error;
  }
};

export { getUserProfile };
