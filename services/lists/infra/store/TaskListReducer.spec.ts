import { describe, expect, it } from '@jest/globals';
import { applyTaskListEvent, createTaskListBase } from '@/services/lists/infra/store/TaskListReducer';

describe('TaskListReducer', () => {
  describe('createTaskListBase', () => {
    it('should create a task-list object with initial values', () => {
      expect(createTaskListBase('my-id')).toStrictEqual({ id: 'my-id', users: [], tasks: [], status: 'active' });
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
        users: [],
        tasks: [],
        status: 'active',
        name: event.createdTaskList.name,
        ownerId: event.authorId,
        creatorId: event.authorId,
        createdAt: event.timestamp,
        updatedAt: event.timestamp,
      });
    });
    it('should rename task-list on rename-task-list-succeeded event', () => {
      const taskList = {
        id: 'my-id',
        users: [],
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
        tasks: [],
        status: 'deleted',
        name: taskList.name,
        ownerId: taskList.ownerId,
        creatorId: taskList.creatorId,
        createdAt: taskList.createdAt,
        updatedAt: deleteEvent.timestamp,
      });
    });
  });
});
