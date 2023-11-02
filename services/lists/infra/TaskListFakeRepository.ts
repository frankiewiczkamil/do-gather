import { list1, list2 } from '@/data/fakeData';
import { TaskListCommand, TaskListQuery } from '@/services/lists/TaskListPorts';
import { TaskList } from '@/services/lists/model/TaskList';

const lists: TaskList[] = [list1, list2];
function saveTask(taskListId: string, task: Task) {
  const taskList = findTaskListById(taskListId);
  if (taskList) {
    taskList.tasks.push(task);
  } else {
    throw new Error('TaskList not found');
  }
}

function saveTaskList(taskList: TaskList) {
  lists.push(taskList);
}

function findTaskListById(id: string) {
  return lists.find((list) => list.id === id);
}

function findAllTaskLists() {
  return lists;
}
function findAllAllowedTaskListsForUser(ownerId: string) {
  return lists.filter((list) => list.ownerId === ownerId || list.users.some((user) => user.userId === ownerId));
}

function deleteTaskList(id: string) {
  const index = lists.findIndex((list) => list.id === id);
  lists.splice(index, 1);
}

function updateTaskListName(id: string, newName: string) {
  const taskList = findTaskListById(id);
  if (taskList === undefined) {
    throw new Error('TaskList not found');
  } else {
    taskList.name = newName;
  }
}

export default {
  saveTaskList,
  saveTask,
  findTaskListById,
  findAllAllowedTaskListsForUser,
  findAllTaskLists,
  deleteTaskList,
  updateTaskListName,
} as TaskListCommand & TaskListQuery;
