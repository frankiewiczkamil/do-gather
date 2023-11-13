import { TaskList, TaskListEventFailed, TaskListEventSucceeded, TaskListIdentifier, UserIdentifier } from '@/services/lists/TaskList';

type DeleteTaskListFailed = TaskListEventFailed & {
  type: 'delete-task-list-failed';
};
export type DeleteTaskListSucceeded = TaskListEventSucceeded & {
  type: 'delete-task-list-succeeded';
};

type DeleteTaskListEvent = DeleteTaskListFailed | DeleteTaskListSucceeded;

type GetTaskListById = (taskListId: TaskListIdentifier) => TaskList | undefined;
export default function deleteTaskList(taskListId: TaskListIdentifier, getTaskListById: GetTaskListById, authorId: UserIdentifier): DeleteTaskListEvent {
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
