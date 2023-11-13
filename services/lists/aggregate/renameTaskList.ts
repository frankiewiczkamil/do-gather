import { TaskList, TaskListEventFailed, TaskListEventSucceeded, TaskListIdentifier, UserIdentifier } from '@/services/lists/TaskList';

export type RenameTaskListDto = {
  newName: string;
  authorId: UserIdentifier;
  taskListId: TaskListIdentifier;
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

type GetTaskListById = (taskListId: TaskListIdentifier) => TaskList | undefined;
export default function RenameTaskList({ taskListId, authorId, newName }: RenameTaskListDto, getTaskListById: GetTaskListById): RenameTaskListEvent {
  const result = {
    newName,
    timestamp: Date.now(),
    authorId,
    taskListId,
  };
  const taskList = getTaskListById(taskListId);
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
