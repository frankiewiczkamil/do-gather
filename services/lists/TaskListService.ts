import { randomUUID } from 'crypto';
import taskListRepository from '@/services/lists/infra/TaskListFakeRepository';
import taskListInvitiationFakeRepository from '@/services/lists/infra/TaskListInvitiationFakeRepository';
import type { CreateTaskListDto, PreviewInvitationDto, TaskList } from '@/services/lists/model/TaskList';
import { CreateTaskDto, Task } from '@/services/lists/model/Task';

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
  return taskListRepository.findAllAllowedTaskListsForUser(ownerId);
}
export function getTaskList(id: string) {
  return taskListRepository.findTaskListById(id);
}

export function addTaskList(createTaskListDto: CreateTaskListDto): string {
  const newTaskList = {
    ...createTaskListDto,
    id: randomUUID(),
    tasks: createTaskListDto.tasks || [],
    users: [{ role: 'editor' as const, userId: createTaskListDto.ownerId }],
  };
  taskListRepository.saveTaskList(newTaskList);
  return newTaskList.id;
}

export function deleteTaskList(id: string) {
  taskListRepository.deleteTaskList(id);
}

export function renameTaskList(id: string, name: string) {
  taskListRepository.updateTaskListName(id, name);
}

export function inviteUserToTaskList(userId: string, taskListId: string, inviterId: string, isEditor: boolean = false) {
  taskListInvitiationFakeRepository.saveInvitation({ userId, taskListId, role: isEditor ? 'editor' : 'viewer', inviterId });
}
export function getInvitations(userId: string, status = 'pending' as const): PreviewInvitationDto[] {
  const invitations = taskListInvitiationFakeRepository.findInvitationByUserId(userId, status);
  return invitations.map((invitation) => {
    const taskList = taskListRepository.findTaskListById(invitation.taskListId);
    return {
      role: invitation.role,
      tasksNumber: taskList.tasks.length,
      taskListName: taskList.name,
      ownerId: taskList.ownerId,
      id: invitation.id,
      inviterId: invitation.inviterId,
    };
  });
}

export function acceptInvitation(invitationId: string, userId: string) {
  const invitation = taskListInvitiationFakeRepository.findInvitationByUserId(userId).find((i) => i.id === invitationId);
  if (!invitation) {
    throw new Error(`Invitation ${invitationId} not found`);
  }
  if (invitation.userId !== userId) {
    throw new Error(`Invitation ${invitationId} is not for user ${userId}`);
  }
  const taskList = taskListRepository.findTaskListById(invitation.taskListId);
  taskListInvitiationFakeRepository.updateInvitationStatus(invitationId, 'accepted');

  if (!taskList.users.find((u) => u.userId === userId)) {
    taskList.users.push({ role: invitation.role, userId: invitation.userId });
  } else {
    console.warn('user already in task list');
  }
}
