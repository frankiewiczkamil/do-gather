import { randomUUID } from 'crypto';
import taskListRepository from '@/services/lists/infra/TaskListFakeRepository';
import type { TaskList } from '@/services/lists/TaskList';
import { CreateTaskDto } from '@/services/lists/Task';
import { CreateTaskListDto } from '@/services/lists/aggregate/createTaskList';

// for now this application service is just a proxy to the repository as there are no business rules yet
// but when business rules arise, this service will translate DTOs to domain objects and call the domain service
export function addTask(taskListId: string, task: CreateTaskDto) {
  const newTask = {
    ...task,
    id: randomUUID(),
    status: 'new' as const,
  };
  taskListRepository.saveTask(taskListId, newTask);
}

export function getTaskLists(ownerId: string): TaskList[] {
  return taskListRepository.findAllAllowedTaskListsForUser(ownerId);
}
export function getTaskList(id: string) {
  return taskListRepository.findTaskListById(id);
}

export function addTaskList(createTaskListDto: CreateTaskListDto): string {
  const t = Date.now();
  const newTaskList = {
    ...createTaskListDto,
    id: randomUUID(),
    tasks: createTaskListDto.tasks || [],
    users: [{ role: 'editor' as const, userId: createTaskListDto.authorId }],
    ownerId: createTaskListDto.authorId,
    creatorId: createTaskListDto.authorId,
    description: createTaskListDto.description || '',
    createdAt: t,
    updatedAt: t,
    status: 'active' as const,
  };

  // createTaskList(newTaskList);
  taskListRepository.saveTaskList(newTaskList);
  return newTaskList.id;
}

export function deleteTaskList(id: string) {
  taskListRepository.deleteTaskList(id);
}

export function renameTaskList(id: string, name: string) {
  taskListRepository.updateTaskListName(id, name);
}
