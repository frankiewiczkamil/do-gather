import { list1, list2 } from '@/data/fakeData';

const lists: TaskList[] = [list1, list2];
const tasksByTaskListId: Record<string, Task[]> = {
  [list1.id]: list1.tasks,
  [list2.id]: list2.tasks,
};

let id = 0;

const createTaskId = () => `${++id}`;
const createTaskListId = () => `${++id}`;

export function addTask(taskListId: string, task: CreateTaskDto) {
  const newTask = {
    ...task,
    id: createTaskId(),
    status: 'new',
  };
  tasksByTaskListId[taskListId].push(newTask);
}
export function getTasks(taskListId: string): Task[] {
  return tasksByTaskListId[taskListId];
}

export function getTaskLists(): TaskList[] {
  return lists;
}

export function addTaskList(createTaskListDto: CreateTaskListDto): string {
  const newTaskList = { ...createTaskListDto, id: createTaskListId(), tasks: createTaskListDto.tasks || [] };
  console.log(newTaskList);
  lists.push(newTaskList);
  return newTaskList.id;
}
