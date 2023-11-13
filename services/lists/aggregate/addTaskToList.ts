import { Task } from '@/services/lists/Task';
import { TaskListEventFailed, TaskListEventSucceeded, UserIdentifier } from '@/services/lists/TaskList';

type AddTaskToListFailed = TaskListEventFailed & {
  type: 'add-task-to-list-failed';
  task: AddTaskToListCommand;
};
type AddTaskToListSucceeded = TaskListEventSucceeded & {
  type: 'add-task-to-list-succeeded';
  task: AddTaskToListCommand;
};

type GetTaskById = (taskId: string) => Task | undefined;
type AddTaskToListCommand = {
  taskListId: string;
  authorId: UserIdentifier;
  id: string;
};
export function addTaskToList(addNewTaskCommand: AddTaskToListCommand, getTaskById: GetTaskById): AddTaskToListFailed | AddTaskToListSucceeded {
  const task = getTaskById(addNewTaskCommand.id);
  const result = {
    timestamp: Date.now(),
    authorId: addNewTaskCommand.authorId,
    taskListId: addNewTaskCommand.taskListId,
    task: addNewTaskCommand,
  };
  if (task) {
    return {
      ...result,
      type: 'add-task-to-list-failed',
      status: 'failed',
      error: `Task with id ${addNewTaskCommand.id} already exists`,
    };
  } else {
    return {
      ...result,
      type: 'add-task-to-list-succeeded',
      status: 'succeeded',
    };
  }
}
