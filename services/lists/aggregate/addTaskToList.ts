import { TaskList, TaskListEventFailed, TaskListEventSucceeded, UserIdentifier } from '@/services/lists/TaskList';

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

type AddTaskToListCommandArgs = {
  name: string;
  taskListId: string;
  authorId: UserIdentifier;
  id: string;
  description?: string;
  timestamp: number;
};
export function addTaskToList(taskList: TaskList, addNewTaskCommandArgs: AddTaskToListCommandArgs): AddTaskToListFailed | AddTaskToListSucceeded {
  const task = taskList.tasks.find((t) => t.id === addNewTaskCommandArgs.id);
  const result = {
    timestamp: addNewTaskCommandArgs.timestamp,
    authorId: addNewTaskCommandArgs.authorId,
    taskListId: addNewTaskCommandArgs.taskListId,
    task: addNewTaskCommandArgs,
  };
  if (task) {
    return {
      ...result,
      type: 'add-task-to-list-failed',
      status: 'failed',
      error: `Task with id ${addNewTaskCommandArgs.id} already exists`,
    };
  } else {
    return {
      ...result,
      type: 'add-task-to-list-succeeded',
      status: 'succeeded',
    };
  }
}
