import { describe, expect, it } from '@jest/globals';
import { applyTaskListEvent, createTaskListBase } from '@/services/lists/infra/store/TaskListReducer';
import { AcceptInvitationToTaskListSucceeded } from '@/services/lists/aggregate/acceptInvitation';
import { Invitation } from '@/services/lists/TaskList';

describe('TaskListReducer', () => {
  describe('createTaskListBase', () => {
    it('should create a task-list object with initial values', () => {
      expect(createTaskListBase('my-id')).toStrictEqual({ id: 'my-id', users: [], tasks: [], status: 'active', invitations: [] });
    });
  });
  describe('applyTaskListEvent', () => {
    it('should initialize values from create-task-list-succeeded event', () => {
      const initialTaskList = createTaskListBase('my-id');
      const event = {
        type: 'create-task-list-succeeded',
        taskListId: 'my-id',
        timestamp: 999,
        authorId: 'author-id',
        status: 'succeeded',
        createdTaskList: {
          name: 'my-name',
          description: 'my-description',
          tasks: [],
        },
      } as const;

      const result = applyTaskListEvent(initialTaskList, event);
      expect(result).toStrictEqual({
        id: 'my-id',
        invitations: [],
        tasks: [],
        status: 'active',
        name: event.createdTaskList.name,
        ownerId: event.authorId,
        users: [{ role: 'editor', userId: event.authorId }],
        creatorId: event.authorId,
        createdAt: event.timestamp,
        updatedAt: event.timestamp,
      });
    });
    it('should rename task-list on rename-task-list-succeeded event', () => {
      const taskList = {
        id: 'my-id',
        users: [],
        invitations: [],
        tasks: [],
        status: 'active' as const,
        name: 'my-name',
        ownerId: 'owner-id',
        creatorId: 'creator-id',
        createdAt: 123,
      };
      const event = {
        type: 'rename-task-list-succeeded',
        taskListId: 'my-id',
        timestamp: 999,
        authorId: 'that-other-guy',
        status: 'succeeded',
        newName: 'new-name',
      } as const;

      const result = applyTaskListEvent(taskList, event);

      expect(result).toStrictEqual({
        id: taskList.id,
        users: [],
        invitations: [],
        tasks: [],
        status: 'active',
        name: event.newName,
        ownerId: taskList.ownerId,
        creatorId: taskList.creatorId,
        createdAt: 123,
        updatedAt: event.timestamp,
      });
    });
    it('should add task to task-list on add-task-to-list-succeeded event', () => {
      const taskList = {
        id: 'my-id',
        users: [],
        invitations: [],
        tasks: [],
        status: 'active' as const,
        name: 'my-name',
        ownerId: 'owner-id',
        creatorId: 'creator-id',
        createdAt: 123,
      };
      const event = {
        type: 'add-task-to-list-succeeded',
        taskListId: 'my-id',
        timestamp: 999,
        authorId: 'that-other-guy',
        status: 'succeeded',
        task: { id: 'task-id', name: 'task-name', description: 'task-description' },
      } as const;
      const result = applyTaskListEvent(taskList, event);
      expect(result).toStrictEqual({
        id: taskList.id,
        users: [],
        invitations: [],
        tasks: [{ id: event.task.id, name: event.task.name, status: 'new', description: event.task.description }],
        status: 'active',
        name: taskList.name,
        ownerId: taskList.ownerId,
        creatorId: taskList.creatorId,
        createdAt: taskList.createdAt,
        updatedAt: event.timestamp,
      });
    });

    it('should add task to task-list on add-task-to-list-succeeded event when there are already tasks', () => {
      const existingTask = { id: 'existing-task-id', name: 'existing-task-name', status: 'new' as const, description: 'existing-task-description' };
      const newTask = { id: 'new-task-id', name: 'new-task-name', status: 'new' as const, description: 'new-task-description' };
      const taskList = {
        id: 'my-id',
        users: [],
        invitations: [],
        tasks: [existingTask],
        status: 'active' as const,
        name: 'my-name',
        ownerId: 'owner-id',
        creatorId: 'creator-id',
        createdAt: 123,
      };
      const event = {
        type: 'add-task-to-list-succeeded',
        taskListId: 'my-id',
        timestamp: 999,
        authorId: 'that-other-guy',
        status: 'succeeded',
        task: newTask,
      } as const;
      const result = applyTaskListEvent(taskList, event);
      expect(result).toStrictEqual({
        id: taskList.id,
        users: [],
        invitations: [],
        tasks: [existingTask, newTask],
        status: 'active',
        name: taskList.name,
        ownerId: taskList.ownerId,
        creatorId: taskList.creatorId,
        createdAt: taskList.createdAt,
        updatedAt: event.timestamp,
      });
    });

    it("should change task-list's status to deleted on delete-task-list-succeeded event", () => {
      const taskList = {
        id: 'my-id',
        users: [],
        invitations: [],
        tasks: [],
        status: 'active' as const,
        name: 'my-name',
        ownerId: 'owner-id',
        creatorId: 'creator-id',
        createdAt: 123,
      };
      const deleteEvent = {
        type: 'delete-task-list-succeeded',
        taskListId: 'my-id',
        timestamp: 999,
        authorId: 'that-other-guy',
        status: 'succeeded',
      } as const;
      const result = applyTaskListEvent(taskList, deleteEvent);
      expect(result).toStrictEqual({
        id: taskList.id,
        users: [],
        invitations: [],
        tasks: [],
        status: 'deleted',
        name: taskList.name,
        ownerId: taskList.ownerId,
        creatorId: taskList.creatorId,
        createdAt: taskList.createdAt,
        updatedAt: deleteEvent.timestamp,
      });
    });

    it('should add invitee to task-list on invite-user-to-task-list-succeeded event', () => {
      const taskList = {
        id: 'my-id',
        users: [],
        invitations: [],
        tasks: [],
        status: 'active' as const,
        name: 'my-name',
        ownerId: 'owner-id',
        creatorId: 'creator-id',
        createdAt: 123,
      };
      const inviteEvent = {
        type: 'invite-user-to-task-list-succeeded',
        taskListId: 'my-id',
        timestamp: 999,
        authorId: 'that-other-guy',
        status: 'succeeded',
        inviteeId: 'invitee-id',
        inviteeRole: 'editor',
        invitationId: 'invitation-id',
      } as const;
      const result = applyTaskListEvent(taskList, inviteEvent);
      expect(result).toStrictEqual({
        id: taskList.id,
        users: [],
        invitations: [{ inviteeRole: 'editor', inviteeId: 'invitee-id', invitationId: inviteEvent.invitationId }],
        tasks: [],
        status: 'active',
        name: taskList.name,
        ownerId: taskList.ownerId,
        creatorId: taskList.creatorId,
        createdAt: taskList.createdAt,
        updatedAt: inviteEvent.timestamp,
      });
    });

    it('should accept invitation to task-list on accept-invitation-to-task-list-succeeded event', () => {
      const invitation: Invitation = { inviteeRole: 'editor', inviteeId: 'invitee-id', invitationId: 'invitation-id' };
      const taskList = {
        id: 'my-id',
        users: [],
        invitations: [invitation],
        tasks: [],
        status: 'active' as const,
        name: 'my-name',
        ownerId: 'owner-id',
        creatorId: 'creator-id',
        createdAt: 123,
      };
      const acceptInvitationEvent: AcceptInvitationToTaskListSucceeded = {
        type: 'accept-invitation-to-task-list-succeeded',
        taskListId: 'my-id',
        timestamp: 999,
        authorId: 'invitee-id',
        status: 'succeeded',
        invitationId: 'invitation-id',
      } as const;
      const result = applyTaskListEvent(taskList, acceptInvitationEvent);
      expect(result).toStrictEqual({
        id: taskList.id,
        users: [{ role: 'editor', userId: 'invitee-id' }],
        invitations: [],
        tasks: [],
        status: 'active',
        name: taskList.name,
        ownerId: taskList.ownerId,
        creatorId: taskList.creatorId,
        createdAt: taskList.createdAt,
        updatedAt: acceptInvitationEvent.timestamp,
      });
    });
  });
});
