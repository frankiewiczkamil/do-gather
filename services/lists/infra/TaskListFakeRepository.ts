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

export default { saveTaskList, saveTask, findTaskListById, findAllTaskLists } as TaskListCommand & TaskListQuery;
