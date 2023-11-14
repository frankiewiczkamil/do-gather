import { Permission, TaskList, TaskListEventFailed, TaskListIdentifier } from '@/services/lists/TaskList';
import { CreateTaskListSucceeded } from '@/services/lists/aggregate/createTaskList';
import { RenameTaskListSucceeded } from '@/services/lists/aggregate/renameTaskList';
import { Task } from '@/services/lists/Task';
import { DeleteTaskListSucceeded } from '@/services/lists/aggregate/deleteTaskList';
import { AddTaskToListSucceeded } from '@/services/lists/aggregate/addTaskToList';

const taskListEventStore: Array<TaskListEventFailed | SuccessEvent> = [];
type TaskListBase = {
  id: TaskListIdentifier;
  users: Permission[];
  tasks: Task[];
  status: 'active' | 'archived' | 'deleted';
};
type SuccessEvent = CreateTaskListSucceeded | RenameTaskListSucceeded | AddTaskToListSucceeded | DeleteTaskListSucceeded;
const createTaskListBase = (taskListId: TaskListIdentifier) => ({
  id: taskListId,
  users: [],
  tasks: [],
  status: 'active' as const,
});

export function selectTaskList(taskListId: TaskListIdentifier) {
  return taskListEventStore
    .filter((event) => event.status === 'succeeded' && event.taskListId === taskListId)
    .reduce(
      (taskList, event) => {
        switch (event.type) {
          case 'create-task-list-succeeded':
            return applyCreateTaskList(taskList, event as CreateTaskListSucceeded);
          case 'rename-task-list-succeeded':
            return applyRenameTaskListSucceeded(taskList, event as RenameTaskListSucceeded);
          case 'delete-task-list-succeeded':
            return applyDeleteTaskListSucceeded(taskList, event as DeleteTaskListSucceeded);
          case 'add-task-to-list-succeeded':
            return applyAddTaskToListSucceeded(taskList, event as AddTaskToListSucceeded);
          default:
            return taskList;
        }
      },
      createTaskListBase(taskListId) as TaskListBase | TaskList,
    );
}

function applyCreateTaskList(taskListPartial: TaskListBase | TaskList, taskCreatedEvent: CreateTaskListSucceeded) {
  return {
    ...taskListPartial,
    name: taskCreatedEvent.createdTaskList.name,
    ownerId: taskCreatedEvent.authorId,
    creatorId: taskCreatedEvent.authorId,
    createdAt: taskCreatedEvent.timestamp,
  };
}
function applyRenameTaskListSucceeded(taskList: TaskListBase | TaskList, event: RenameTaskListSucceeded) {
  return {
    ...taskList,
    name: event.newName,
  };
}

function applyDeleteTaskListSucceeded(taskList: TaskListBase | TaskList, _event: DeleteTaskListSucceeded) {
  return {
    ...taskList,
    status: 'deleted' as const,
  };
}

function applyAddTaskToListSucceeded(taskList: TaskListBase | TaskList, event: AddTaskToListSucceeded) {
  const newTask = { id: event.task.id, name: event.task.name, status: 'new' as const, description: event.task.description };
  return {
    ...taskList,
    tasks: [...taskList.tasks, newTask],
  };
}
