const EApplicationEnvironment = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};

const TaskStatus = {
  TODO: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
  ON_HOLD: 3,
  BLOCKED: 4,
  CANCELLED: 5,
  PENDING_REVIEW: 6,
  APPROVED: 7,
  REJECTED: 8,
  DEFERRED: 9,
  SCHEDULED: 10,
  ARCHIVED: 11,
};

Object.freeze(EApplicationEnvironment);
Object.freeze(TaskStatus);

export { EApplicationEnvironment, TaskStatus };
