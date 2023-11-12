import { Task } from '@/services/lists/Task';

export type TaskList = {
  id: string;
  name: string;
  tasks: Task[];
  ownerId: string;
  users: Permission[];
};

export type CreateTaskListDto = {
  name: string;
  tasks?: Task[];
  ownerId: string;
};

export type Role = 'editor' | 'viewer';
export type Permission = {
  role: Role;
  userId: string;
};
