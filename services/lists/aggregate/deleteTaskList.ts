import { TaskList, TaskListEventFailed, TaskListEventSucceeded, TaskListIdentifier, UserIdentifier } from '@/services/lists/TaskList';

type DeleteTaskListFailed = TaskListEventFailed & {
  type: 'delete-task-list-failed';
};
export type DeleteTaskListSucceeded = TaskListEventSucceeded & {
  type: 'delete-task-list-succeeded';
};

type DeleteTaskListEvent = DeleteTaskListFailed | DeleteTaskListSucceeded;
export type DeleteTaskListArgs = {
  taskListId: TaskListIdentifier;
  authorId: UserIdentifier;
  timestamp: number;
};

export default function deleteTaskList(taskList: TaskList, { taskListId, authorId, timestamp }: DeleteTaskListArgs): DeleteTaskListEvent {
  // todo decide where and how user permissions are checked
  if (!taskList) {
    return {
      type: 'delete-task-list-failed',
      taskListId,
      timestamp,
      authorId,
      status: 'failed',
      error: `Task list with id ${taskListId} not found`,
    };
  } else
    return {
      type: 'delete-task-list-succeeded',
      taskListId,
      timestamp,
      authorId,
      status: 'succeeded',
    };
}
