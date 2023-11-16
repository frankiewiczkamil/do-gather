import { Task } from '@/services/lists/Task';

export type TaskListIdentifier = string;
export type UserIdentifier = string;

type TaskListEventBase = {
  timestamp: number;
  authorId: UserIdentifier;
  taskListId: TaskListIdentifier;
  type: string;
};
export type TaskListEventSucceeded = { status: 'succeeded' } & TaskListEventBase;
export type TaskListEventFailed = {
  status: 'failed';
  error: string | Error;
} & TaskListEventBase;

export type TaskListEvent = TaskListEventSucceeded | TaskListEventFailed;
export type TaskList = {
  id: string;
  name: string;
  tasks: Task[];
  ownerId: UserIdentifier;
  creatorId: UserIdentifier;
  createdAt: number;
  updatedAt: number;
  users: Permission[];
  // description: string;
  status: 'active' | 'archived' | 'deleted';
};

export type Role = 'editor' | 'viewer';
export type Permission = {
  role: Role;
  userId: UserIdentifier;
};
