import joi from 'joi';

const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{8,30}$/;

const registrationSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(30).pattern(passwordRegex).required(),
  name: joi.string().required(),
  avatar: joi.string().uri(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(30).pattern(passwordRegex).required(),
});

const organizationSchema = joi.object({
  name: joi.string().required(),
});

const projectSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
});

const taskSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  project: joi.string().required(),
  type: joi.number(),
  priority: joi.number(),
  start_date: joi.date(),
  end_date: joi.date(),
  media: joi.array().items(joi.string()),
});

const commentSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  project: joi.string().required(),
});

export {
  registrationSchema,
  passwordRegex,
  loginSchema,
  organizationSchema,
  projectSchema,
  taskSchema,
  commentSchema,
};
