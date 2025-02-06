import Profile from '../models/ProfileModel.js';
import User from '../models/UserModel.js';
import logger from '../utils/logger.js';

/**
 * Creates a new user and their profile.
 *
 * @param {Object} data - The user data.
 * @param {string} data.email - The email of the user.
 * @param {string} data.password - The password of the user.
 * @param {string} [data.name] - The name of the user.
 * @returns {Promise<Object|Error>} The created user profile or an error.
 * @throws {Error} If the user or user profile creation fails.
 */
const createUser = async (data) => {
  try {
    const newUser = new User({
      email: data?.email,
      password: data?.password,
    });

    const userObj = await newUser.save();

    if (!userObj) {
      logger.error('OPERATION_FAILURE', {
        meta: { message: 'Failed to create user entry' },
      });
      throw new Error('Failed to create user entry');
    }

    // need to implement the image upload functionality as well. It will be a separate handler.

    const userProfile = await createUserProfile(
      data?.email,
      data?.name,
      userObj?._id,
      '',
    );

    if (!userProfile) {
      logger.error('OPERATION_FAILURE', {
        meta: { message: 'Failed to create user profile entry' },
      });
      throw new Error('Failed to create user profile entry');
    }

    return userProfile;
  } catch (error) {
    return error;
  }
};

/**
 * Creates a new user profile and saves it to the database.
 *
 * @param {string} email - The email of the user.
 * @param {string} name - The name of the user.
 * @param {string} user_id - The unique identifier of the user.
 * @param {string} [avatar=''] - The avatar URL of the user (optional).
 * @returns {Promise<Object|null|Error>} The created user profile object, null if creation failed, or an error if an exception occurred.
 */
const createUserProfile = async (email, name, user_id, avatar) => {
  try {
    const newUserProfile = new Profile({
      name,
      email,
      user_id,
      avatar,
    });

    const userProfile = await newUserProfile.save();

    if (!userProfile) {
      return null;
    }

    return userProfile;
  } catch (error) {
    return error;
  }
};

/**
 * Authenticates a user by their email and password.
 *
 * @param {string} email - The email of the user attempting to log in.
 * @param {string} password - The password of the user attempting to log in.
 * @returns {Promise<Object|Error>} - Returns the authenticated user object if successful, otherwise throws an error.
 * @throws {Error} - Throws an error if the user is not found or if the credentials are invalid.
 */
const loginService = async (email, password) => {
  try {
    const user = await checkIfUserExists(email);

    if (!user) {
      logger.error('AUTH_FAILURE', {
        meta: { message: 'User not found' },
      });
      throw new Error('User not found');
    }

    const isPasswordValid = await user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      logger.error('AUTH_FAILURE', {
        meta: { message: 'Invalid credentials' },
      });
      throw new Error('Invalid credentials');
    }

    return user;
  } catch (error) {
    return error;
  }
};

/**
 * Checks if a user exists in the database by their email.
 *
 * @param {string} email - The email of the user to check.
 * @returns {Promise<Object|null|Error>} - Returns the user object if found, null if not found, or an error if an exception occurs.
 */
const checkIfUserExists = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return error;
  }
};

export { createUser, loginService };
