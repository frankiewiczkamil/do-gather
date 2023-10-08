import { list1, list2 } from '@/data/fakeData';

const lists: TodoList[] = [list1, list2];
const tasksByTodoListId: Record<string, Task[]> = {
  [list1.id]: list1.tasks,
  [list2.id]: list2.tasks,
};

let id = 0;

const createTaskId = () => `${id}`;
const createTodoListId = () => `${id}`;

export function addTask(todoListId: string, task: CreateTaskDto) {
  const newTask = {
    ...task,
    id: createTaskId(),
    status: 'new',
  };
  tasksByTodoListId[todoListId].push(newTask);
}
export function getTasks(todoListId: string): Task[] {
  return tasksByTodoListId[todoListId];
}

export function getTodoLists(): TodoList[] {
  return lists;
}

export function addTodoLists(createTodoListDto: CreateTodoListDto): string {
  const newTodoList = { ...createTodoListDto, id: createTodoListId(), tasks: createTodoListDto.tasks || [] };
  lists.push(newTodoList);
  return newTodoList.id;
}
