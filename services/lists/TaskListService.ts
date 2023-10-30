import { randomUUID } from 'crypto';
import taskListRepository from '@/services/lists/infra/TaskListFakeRepository';

// for now this application service is just a proxy to the repository as there are no business rules yet
// but when business rules arise, this service will translate DTOs to domain objects and call the domain service
export function addTask(taskListId: string, task: CreateTaskDto) {
  const newTask = {
    ...task,
    id: randomUUID(),
    status: 'new',
  };
  taskListRepository.saveTask(taskListId, newTask);
}
export function getTasks(taskListId: string): Task[] {
  return taskListRepository.findTaskListById(taskListId)?.tasks || [];
}

export function getTaskLists(ownerId: string): TaskList[] {
  return taskListRepository.findAllTaskListsByOwnerId(ownerId);
}
export function getTaskList(id: string) {
  return taskListRepository.findTaskListById(id);
}

export function addTaskList(createTaskListDto: CreateTaskListDto): string {
  const newTaskList = { ...createTaskListDto, id: randomUUID(), tasks: createTaskListDto.tasks || [] };
  taskListRepository.saveTaskList(newTaskList);
  return newTaskList.id;
}

export function deleteTaskList(id: string) {
  taskListRepository.deleteTaskList(id);
}

export function renameTaskList(id: string, name: string) {
  taskListRepository.updateTaskListName(id, name);
}
