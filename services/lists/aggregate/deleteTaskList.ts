import { TaskList, TaskListEventFailed, TaskListEventSucceeded, TaskListIdentifier, UserIdentifier } from '@/services/lists/TaskList';

type DeleteTaskListFailed = TaskListEventFailed & {
  type: 'delete-task-list-failed';
};
export type DeleteTaskListSucceeded = TaskListEventSucceeded & {
  type: 'delete-task-list-succeeded';
};

type DeleteTaskListEvent = DeleteTaskListFailed | DeleteTaskListSucceeded;
export type DeleteTaskListCommand = {
  taskListId: TaskListIdentifier;
  authorId: UserIdentifier;
};

type GetTaskListById = (taskListId: TaskListIdentifier) => TaskList | undefined;
export default function deleteTaskList({ taskListId, authorId }: DeleteTaskListCommand, getTaskListById: GetTaskListById): DeleteTaskListEvent {
  // todo decide where and how user permissions are checked
  const taskList = getTaskListById(taskListId);
  if (!taskList) {
    return {
      type: 'delete-task-list-failed',
      taskListId,
      timestamp: Date.now(),
      authorId,
      status: 'failed',
      error: `Task list with id ${taskListId} not found`,
    };
  } else
    return {
      type: 'delete-task-list-succeeded',
      taskListId,
      timestamp: Date.now(),
      authorId,
      status: 'succeeded',
    };
}
