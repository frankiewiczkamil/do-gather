import { TaskListEventFailed, TaskListEventSucceeded, UserIdentifier } from '@/services/lists/TaskList';
import { Task } from '@/services/lists/Task';

export type CreateTaskListDto = {
  taskListId: string;
  name: string;
  description?: string;
  tasks?: Task[];
  authorId: UserIdentifier;
  timestamp: number;
};
type CreateTaskListArgs = CreateTaskListDto;
type CreateTaskListFailed = TaskListEventFailed & {
  type: 'create-task-list-failed';
  requestedTaskList: CreateTaskListArgs;
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
export default function createTaskList({ name, tasks, description, authorId, taskListId, timestamp }: CreateTaskListArgs): CreateTaskListEvent {
  // no business rules yet, so just return a succeeded event
  return {
    type: 'create-task-list-succeeded',
    taskListId,
    timestamp,
    authorId,
    status: 'succeeded',
    createdTaskList: {
      name,
      description,
      tasks: tasks || [],
    },
  };
}
