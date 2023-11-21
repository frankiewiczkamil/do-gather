import { randomUUID } from 'crypto';
import taskListRepository from '@/services/lists/infra/TaskListReadModel';
import type { TaskList } from '@/services/lists/TaskList';
import { CreateTaskDto } from '@/services/lists/Task';
import createTaskList, { CreateTaskListDto } from '@/services/lists/aggregate/createTaskList';
import { publishTaskListEvent, selectTaskList } from '@/services/lists/infra/store/TaskListEventStore';
import { addTaskToList } from '@/services/lists/aggregate/addTaskToList';
import renameGivenTaskList from '@/services/lists/aggregate/renameTaskList';
import removeTaskList from '@/services/lists/aggregate/deleteTaskList';

// for now this application service is just a proxy to the repository as there are no business rules yet
// but when business rules arise, this service will translate DTOs to domain objects and call the domain service
export function addTask(taskListId: string, task: CreateTaskDto, authorId: string) {
  const taskId = randomUUID();
  const commandPayload = {
    taskListId,
    authorId,
    name: task.name,
    id: taskId,
    description: task.description,
    timestamp: Date.now(),
  };
  const event = addTaskToList(selectTaskList(taskListId), commandPayload);
  publishTaskListEvent(event);
  taskListRepository.build();
}

export function getTaskLists(ownerId: string): TaskList[] {
  return taskListRepository.findAllAllowedTaskListsForUser(ownerId);
}
export function getTaskList(id: string) {
  // console.log('getTaskLists:', selectTaskList(id));
  return taskListRepository.findTaskListById(id) as TaskList;
}

export function addTaskList(createTaskListDto: CreateTaskListDto): string {
  const newTaskList = {
    name: createTaskListDto.name,
    authorId: createTaskListDto.authorId,
    taskListId: randomUUID(),
    description: createTaskListDto.description || '',
    timestamp: Date.now(),
  };
  const event = createTaskList(newTaskList);
  publishTaskListEvent(event);
  taskListRepository.build();
  return event.taskListId;
}

export function deleteTaskList(id: string, authorId: string) {
  const event = removeTaskList(selectTaskList(id), {
    taskListId: id,
    timestamp: Date.now(),
    authorId,
  });
  publishTaskListEvent(event);
  taskListRepository.build();
}

export function renameTaskList(id: string, name: string, authorId: string) {
  const event = renameGivenTaskList(selectTaskList(id), {
    taskListId: id,
    timestamp: Date.now(),
    authorId,
    newName: name,
  });
  publishTaskListEvent(event);
  taskListRepository.build();
}
