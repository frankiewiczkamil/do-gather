import { randomUUID } from 'crypto';
import { TaskListEventFailed, TaskListEventSucceeded, UserIdentifier } from '@/services/lists/TaskList';
import { Task } from '@/services/lists/Task';

export type CreateTaskListDto = {
  name: string;
  description?: string;
  tasks?: Task[];
  authorId: UserIdentifier;
};
type CreateTaskListFailed = TaskListEventFailed & {
  type: 'create-task-list-failed';
  requestedTaskList: CreateTaskListDto;
};
export type CreateTaskListSucceeded = TaskListEventSucceeded & {
  type: 'create-task-list-succeeded';
  createdTaskList: {
    name: string;
    description?: string;
    tasks: Task[];
  };
};

type CreateTaskListEvent = CreateTaskListFailed | CreateTaskListSucceeded;
export default function createTaskList({ name, tasks, description, authorId }: CreateTaskListDto): CreateTaskListEvent {
  // no business rules yet, so just return a succeeded event
  return {
    type: 'create-task-list-succeeded',
    taskListId: randomUUID(),
    timestamp: Date.now(),
    authorId,
    status: 'succeeded',
    createdTaskList: {
      name,
      description,
      tasks: tasks || [],
    },
  };
}
