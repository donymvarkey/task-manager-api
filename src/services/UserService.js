import Profile from '../models/ProfileModel.js';

const getUserProfile = async (userId) => {
  try {
    const data = await Profile.findOne({ user_id: userId });

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
};

export { getUserProfile };
