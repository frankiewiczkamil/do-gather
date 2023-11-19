import { TaskList } from '@/services/lists/TaskList';
import { Task } from '@/services/lists/Task';
import { CreateTaskListSucceeded } from '@/services/lists/aggregate/createTaskList';
import { RenameTaskListSucceeded } from '@/services/lists/aggregate/renameTaskList';
import { AddTaskToListFailed, AddTaskToListSucceeded } from '@/services/lists/aggregate/addTaskToList';
import { AcceptInvitationToTaskListSucceeded } from '@/services/lists/aggregate/acceptInvitation';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
export const tasks1: Task[] = [
  { id: 'elo', name: 'first task', description: lorem, status: 'in-progress' },
  { id: 'ole', name: 'second task', description: lorem, status: 'new' },
];

export const tasks2: Task[] = [
  { id: 'hello', name: 'pierwsze zadanie', description: lorem, status: 'done' },
  { id: 'world', name: 'drugie zadanie', description: lorem, status: 'new' },
];

const zenekId = 'zenek';
const halinkaId = 'halinka';

export const list1: TaskList = {
  id: 'list-1',
  name: 'pierwsze lista',
  tasks: tasks1,
  ownerId: 'zenek',
  users: [
    { role: 'editor', userId: 'zenek' },
    { role: 'viewer', userId: 'halinka' },
  ],
  invitations: [],
  createdAt: 1700029000,
  updatedAt: 1700129000,
  creatorId: 'zenek',
  status: 'active',
};
export const list2: TaskList = {
  id: 'list-2',
  name: 'second list',
  tasks: tasks2,
  ownerId: 'zenek',
  creatorId: 'zenek',
  createdAt: 1700025000,
  updatedAt: 1700126000,
  status: 'active',
  users: [{ role: 'editor', userId: 'zenek' }],
  invitations: [],
};

const taskList1Id = 'list-1';
let timestamp = 0;
const createTaskList1SucceededEvent: CreateTaskListSucceeded = {
  type: 'create-task-list-succeeded',
  taskListId: taskList1Id,
  timestamp: timestamp++,
  authorId: zenekId,
  status: 'succeeded',
  createdTaskList: {
    name: 'pierwsza lista',
    description: 'my-description',
    tasks: [],
  },
};

const createTaskList2SucceededEvent: CreateTaskListSucceeded = {
  type: 'create-task-list-succeeded',
  taskListId: list2.id,
  timestamp: timestamp++,
  authorId: zenekId,
  status: 'succeeded',
  createdTaskList: {
    name: list2.name,
    description: 'my-description',
    tasks: [],
  },
};

const renameTaskListSucceededEvent: RenameTaskListSucceeded = {
  type: 'rename-task-list-succeeded',
  taskListId: taskList1Id,
  timestamp: 2,
  authorId: zenekId,
  status: 'succeeded',
  newName: 'pierwsza lista++',
};
const addTaskToListSucceededEvent: AddTaskToListSucceeded = {
  type: 'add-task-to-list-succeeded',
  taskListId: taskList1Id,
  timestamp: timestamp++,
  authorId: 'that-other-guy2',
  status: 'succeeded',
  task: {
    id: tasks1[0].id,
    name: tasks1[0].name,
    description: tasks1[0].description,
  },
};

const addAnotherTaskToListSucceededEvent: AddTaskToListSucceeded = {
  type: 'add-task-to-list-succeeded',
  taskListId: taskList1Id,
  timestamp: timestamp++,
  authorId: zenekId,
  status: 'succeeded',
  task: {
    id: tasks1[1].id,
    name: tasks1[1].name,
    description: tasks1[1].description,
  },
};
const addTaskToList2SucceededEvent: AddTaskToListSucceeded = {
  type: 'add-task-to-list-succeeded',
  taskListId: list2.id,
  timestamp: timestamp++,
  authorId: 'that-other-guy2',
  status: 'succeeded',
  task: {
    id: tasks2[0].id,
    name: tasks2[0].name,
    description: tasks2[0].description,
  },
};

const addAnotherTaskToList2SucceededEvent: AddTaskToListSucceeded = {
  type: 'add-task-to-list-succeeded',
  taskListId: list2.id,
  timestamp: timestamp++,
  authorId: zenekId,
  status: 'succeeded',
  task: {
    id: tasks2[1].id,
    name: tasks2[1].name,
    description: tasks2[1].description,
  },
};

const addTaskToListFailed: AddTaskToListFailed = {
  type: 'add-task-to-list-failed',
  taskListId: taskList1Id,
  timestamp: timestamp++,
  authorId: 'that-other-guy3',
  status: 'failed',
  error: 'some error',
  task: {
    id: 'task-id2',
    name: 'task-name2',
    description: 'task-description2',
  },
};

const inviteUserEventToList1 = {
  type: 'invite-user-to-task-list-succeeded',
  taskListId: list1.id,
  timestamp: timestamp++,
  authorId: zenekId,
  status: 'succeeded',
  inviteeId: halinkaId,
  inviteeRole: 'viewer',
  invitationId: 'invitation-id1',
} as const;

const inviteUserEventToList2 = {
  type: 'invite-user-to-task-list-succeeded',
  taskListId: list2.id,
  timestamp: timestamp++,
  authorId: zenekId,
  status: 'succeeded',
  inviteeId: halinkaId,
  inviteeRole: 'editor',
  invitationId: 'invitation-id2',
} as const;

const acceptInvitationEvent: AcceptInvitationToTaskListSucceeded = {
  type: 'accept-invitation-to-task-list-succeeded',
  taskListId: list1.id,
  timestamp: timestamp++,
  authorId: halinkaId,
  status: 'succeeded',
  invitationId: inviteUserEventToList1.invitationId,
} as const;

export const initialTaskListEvents = [
  createTaskList1SucceededEvent,
  renameTaskListSucceededEvent,
  addTaskToListSucceededEvent,
  addAnotherTaskToListSucceededEvent,
  addTaskToList2SucceededEvent,
  addAnotherTaskToList2SucceededEvent,
  addTaskToListFailed,
  inviteUserEventToList1,
  inviteUserEventToList2,
  acceptInvitationEvent,
  createTaskList2SucceededEvent,
];
