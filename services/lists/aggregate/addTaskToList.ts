import { Task } from '@/services/lists/Task';
import { TaskListEventFailed, TaskListEventSucceeded, UserIdentifier } from '@/services/lists/TaskList';

type NewTaskDto = {
  id: string;
  name: string;
  description?: string;
};
export type AddTaskToListFailed = TaskListEventFailed & {
  type: 'add-task-to-list-failed';
  task: NewTaskDto;
};
export type AddTaskToListSucceeded = TaskListEventSucceeded & {
  type: 'add-task-to-list-succeeded';
  task: NewTaskDto;
};

type GetTaskById = (taskId: string) => Task | undefined;
type AddTaskToListCommand = {
  name: string;
  taskListId: string;
  authorId: UserIdentifier;
  id: string;
  description?: string;
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
