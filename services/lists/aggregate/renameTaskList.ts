import { TaskList, TaskListEventFailed, TaskListEventSucceeded, TaskListIdentifier, UserIdentifier } from '@/services/lists/TaskList';

export type RenameTaskListArgs = {
  newName: string;
  authorId: UserIdentifier;
  taskListId: TaskListIdentifier;
  timestamp: number;
};

type RenameTaskListFailed = TaskListEventFailed & {
  type: 'rename-task-list-failed';
  newName: string;
};
export type RenameTaskListSucceeded = TaskListEventSucceeded & {
  type: 'rename-task-list-succeeded';
  newName: string;
};

type RenameTaskListEvent = RenameTaskListFailed | RenameTaskListSucceeded;

export default function RenameTaskList(taskList: TaskList, { taskListId, authorId, newName, timestamp }: RenameTaskListArgs): RenameTaskListEvent {
  const result = {
    newName,
    timestamp,
    authorId,
    taskListId,
  };
  if (!taskList) {
    return {
      ...result,
      type: 'rename-task-list-failed',
      status: 'failed',
      error: `Task list with id ${taskListId} not found`,
    };
  } else if (taskList.name === newName) {
    return {
      ...result,
      type: 'rename-task-list-failed',
      status: 'failed',
      error: `Cannot rename task list ${taskListId} to the same name`,
    };
  } else {
    return {
      ...result,
      type: 'rename-task-list-succeeded',
      status: 'succeeded',
    };
  }
}
