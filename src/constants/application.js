const EApplicationEnvironment = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};

const MEMBER_OPERATIONS = {
  ADD: 'add',
  REMOVE: 'remove',
};

const TASK_STATUS = {
  TODO: 0,
  IN_PROGRESS: 1,
  DONE: 2,
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

const TASK_TYPE_MAP = {
  // Development & Engineering
  FEATURE_IMPLEMENTATION: 0,
  BUG_FIXING: 1,
  CODE_REVIEW: 2,
  REFACTORING: 3,
  TESTING_TASK: 4,
  DEPLOYMENT_TASK: 5,
  INFRASTRUCTURE_SETUP: 6,

  // Planning & Management
  BACKLOG_ITEM: 7,
  SPRINT_TASK: 8,
  MILESTONE_TASK: 9,
  RESOURCE_ALLOCATION: 10,
  APPROVAL_TASK: 11,

  // Design & UX
  WIREFRAMING_TASK: 12,
  UI_UX_DESIGN_TASK: 13,
  USER_TESTING_TASK: 14,
  PROTOTYPING_TASK: 15,

  // Research & Documentation
  MARKET_RESEARCH: 16,
  TECHNICAL_RESEARCH: 17,
  DOCUMENTATION: 18,

  // Communication & Coordination
  MEETING_TASK: 19,
  STATUS_UPDATE_TASK: 20,
  CLIENT_FEEDBACK_TASK: 21,

  // Miscellaneous
  SUPPORT_TASK: 22,
  TRAINING_TASK: 23,
  MAINTENANCE_TASK: 24,
};

const TASK_PRIORITY_MAP = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
  CRITICAL: 3,
};

Object.freeze(EApplicationEnvironment);
Object.freeze(TASK_STATUS);
Object.freeze(TASK_TYPE_MAP);
Object.freeze(TASK_PRIORITY_MAP);
Object.freeze(MEMBER_OPERATIONS);

export {
  EApplicationEnvironment,
  TASK_STATUS,
  TASK_PRIORITY_MAP,
  MEMBER_OPERATIONS,
};
