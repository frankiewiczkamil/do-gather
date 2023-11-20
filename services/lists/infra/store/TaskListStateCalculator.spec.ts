import { describe, it } from '@jest/globals';
import { RenameTaskListSucceeded } from '@/services/lists/aggregate/renameTaskList';
import { AddTaskToListFailed, AddTaskToListSucceeded } from '@/services/lists/aggregate/addTaskToList';
import { CreateTaskListSucceeded } from '@/services/lists/aggregate/createTaskList';
import { calculateTaskListState } from '@/services/lists/infra/store/TaskListStateCalculator';
import { AcceptInvitationToTaskListSucceeded } from '@/services/lists/aggregate/acceptInvitation';

const taskListId = 'my-id';
const createTaskListSucceededEvent: CreateTaskListSucceeded = {
  type: 'create-task-list-succeeded',
  taskListId: taskListId,
  timestamp: 1,
  authorId: 'author-id',
  status: 'succeeded',
  createdTaskList: {
    name: 'my-name',
    description: 'my-description',
    tasks: [],
  },
};

const renameTaskListSucceededEvent: RenameTaskListSucceeded = {
  type: 'rename-task-list-succeeded',
  taskListId: taskListId,
  timestamp: 2,
  authorId: 'that-other-guy',
  status: 'succeeded',
  newName: 'new-name',
};
const addTaskToListSucceededEvent: AddTaskToListSucceeded = {
  type: 'add-task-to-list-succeeded',
  taskListId: taskListId,
  timestamp: 3,
  authorId: 'that-other-guy2',
  status: 'succeeded',
  task: {
    id: 'task-id',
    name: 'task-name',
    description: 'task-description',
  },
};
const addTaskToListSucceededEventOtherId: AddTaskToListSucceeded = {
  type: 'add-task-to-list-succeeded',
  taskListId: 'other-id',
  timestamp: 3,
  authorId: 'that-other-guy2',
  status: 'succeeded',
  task: {
    id: 'task-id-other',
    name: 'task-name-other',
    description: 'task-description-other',
  },
};
const addAnotherTaskToListSucceededEvent: AddTaskToListSucceeded = {
  type: 'add-task-to-list-succeeded',
  taskListId: taskListId,
  timestamp: 4,
  authorId: 'that-other-guy3',
  status: 'succeeded',
  task: {
    id: 'task-id2',
    name: 'task-name2',
    description: 'task-description2',
  },
};

const addTaskToListFailed: AddTaskToListFailed = {
  type: 'add-task-to-list-failed',
  taskListId: taskListId,
  timestamp: 5,
  authorId: 'that-other-guy3',
  status: 'failed',
  error: 'some error',
  task: {
    id: 'task-id2',
    name: 'task-name2',
    description: 'task-description2',
  },
};
const inviteEvent1 = {
  type: 'invite-user-to-task-list-succeeded',
  taskListId: 'my-id',
  timestamp: 6,
  authorId: 'that-other-guy',
  status: 'succeeded',
  inviteeId: 'invitee-id1',
  inviteeRole: 'viewer',
  invitationId: 'invitation-id1',
} as const;
const inviteEvent2 = {
  type: 'invite-user-to-task-list-succeeded',
  taskListId: 'my-id',
  timestamp: 7,
  authorId: 'that-other-guy',
  status: 'succeeded',
  inviteeId: 'invitee-id2',
  inviteeRole: 'editor',
  invitationId: 'invitation-id2',
} as const;

const acceptInvitationEvent: AcceptInvitationToTaskListSucceeded = {
  type: 'accept-invitation-to-task-list-succeeded',
  taskListId: 'my-id',
  timestamp: 8,
  authorId: 'invitee-id',
  status: 'succeeded',
  invitationId: 'invitation-id1',
} as const;

describe('TaskListEventStore', () => {
  const events = [
    createTaskListSucceededEvent,
    renameTaskListSucceededEvent,
    addTaskToListSucceededEvent,
    addTaskToListSucceededEventOtherId,
    addAnotherTaskToListSucceededEvent,
    addTaskToListFailed,
    inviteEvent1,
    inviteEvent2,
    acceptInvitationEvent,
  ];

  describe('selectTaskList', () => {
    it('should build aggregate from given events', () => {
      const result = calculateTaskListState(events, taskListId);
      expect(result).toStrictEqual({
        id: taskListId,
        users: [
          { role: 'editor', userId: 'author-id' },
          { userId: 'invitee-id1', role: 'viewer' },
        ],
        invitations: [{ inviteeRole: 'editor', inviteeId: 'invitee-id2', invitationId: inviteEvent2.invitationId }],
        tasks: [
          {
            id: addTaskToListSucceededEvent.task.id,
            name: addTaskToListSucceededEvent.task.name,
            status: 'new',
            description: addTaskToListSucceededEvent.task.description,
          },
          {
            id: addAnotherTaskToListSucceededEvent.task.id,
            name: addAnotherTaskToListSucceededEvent.task.name,
            status: 'new',
            description: addAnotherTaskToListSucceededEvent.task.description,
          },
        ],
        status: 'active',
        name: renameTaskListSucceededEvent.newName,
        ownerId: createTaskListSucceededEvent.authorId,
        creatorId: createTaskListSucceededEvent.authorId,
        createdAt: createTaskListSucceededEvent.timestamp,
        updatedAt: acceptInvitationEvent.timestamp,
      });
    });
  });
});
