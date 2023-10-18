import { list1, list2 } from '@/data/fakeData';
import { TaskListCommand, TaskListQuery } from '@/services/lists/TaskListPorts';

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

function deleteTaskList(id: string) {
  const index = lists.findIndex((list) => list.id === id);
  lists.splice(index, 1);
}

export default { saveTaskList, saveTask, findTaskListById, findAllTaskLists, deleteTaskList } as TaskListCommand & TaskListQuery;
