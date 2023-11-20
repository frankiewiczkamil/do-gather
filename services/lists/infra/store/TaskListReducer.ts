import { Invitation, Permission, TaskList, TaskListEvent, TaskListIdentifier } from '@/services/lists/TaskList';
import { CreateTaskListSucceeded } from '@/services/lists/aggregate/createTaskList';
import { RenameTaskListSucceeded } from '@/services/lists/aggregate/renameTaskList';
import { DeleteTaskListSucceeded } from '@/services/lists/aggregate/deleteTaskList';
import { AddTaskToListSucceeded } from '@/services/lists/aggregate/addTaskToList';
import { Task } from '@/services/lists/Task';
import { InviteUserToTheTaskListSucceeded } from '@/services/lists/aggregate/inviteUser';
import { AcceptInvitationToTaskListArgs, AcceptInvitationToTaskListSucceeded } from '@/services/lists/aggregate/acceptInvitation';

export function applyTaskListEvent(taskList: TaskListBase | TaskList, event: TaskListEvent | TaskListSuccessEvent) {
  switch (event.type) {
    case 'create-task-list-succeeded':
      return applyCreateTaskList(taskList, event as CreateTaskListSucceeded);
    case 'rename-task-list-succeeded':
      return applyRenameTaskListSucceeded(taskList as TaskList, event as RenameTaskListSucceeded);
    case 'delete-task-list-succeeded':
      return applyDeleteTaskListSucceeded(taskList as TaskList, event as DeleteTaskListSucceeded);
    case 'add-task-to-list-succeeded':
      return applyAddTaskToListSucceeded(taskList as TaskList, event as AddTaskToListSucceeded);
    case 'invite-user-to-task-list-succeeded':
      return applyInviteUserToTaskListSucceeded(taskList as TaskList, event as InviteUserToTheTaskListSucceeded);
    case 'accept-invitation-to-task-list-succeeded':
      return applyAcceptInvitationToTaskListSucceeded(taskList as TaskList, event as AcceptInvitationToTaskListSucceeded);
    default:
      return taskList;
  }
}

function applyCreateTaskList(taskListPartial: TaskListBase | TaskList, taskCreatedEvent: CreateTaskListSucceeded) {
  return {
    ...taskListPartial,
    name: taskCreatedEvent.createdTaskList.name,
    ownerId: taskCreatedEvent.authorId,
    creatorId: taskCreatedEvent.authorId,
    users: [{ role: 'editor', userId: taskCreatedEvent.authorId }],
    createdAt: taskCreatedEvent.timestamp,
    updatedAt: taskCreatedEvent.timestamp,
  } as TaskList;
}
function applyRenameTaskListSucceeded(taskList: TaskList, event: RenameTaskListSucceeded) {
  return {
    ...taskList,
    name: event.newName,
    updatedAt: event.timestamp,
  };
}

function applyDeleteTaskListSucceeded(taskList: TaskList, event: DeleteTaskListSucceeded) {
  return {
    ...taskList,
    status: 'deleted' as const,
    updatedAt: event.timestamp,
  };
}

function applyAddTaskToListSucceeded(taskList: TaskList, event: AddTaskToListSucceeded) {
  const newTask = { id: event.task.id, name: event.task.name, status: 'new' as const, description: event.task.description };
  return {
    ...taskList,
    tasks: [...taskList.tasks, newTask],
    updatedAt: event.timestamp,
  };
}

function applyInviteUserToTaskListSucceeded(taskList: TaskList, event: InviteUserToTheTaskListSucceeded) {
  return {
    ...taskList,
    invitations: [...taskList.invitations, { inviteeRole: event.inviteeRole, inviteeId: event.inviteeId, invitationId: event.invitationId }],
    updatedAt: event.timestamp,
  };
}

function applyAcceptInvitationToTaskListSucceeded(taskList: TaskList, event: AcceptInvitationToTaskListArgs) {
  const invitation = taskList.invitations.find((invitation) => invitation.invitationId === event.invitationId);
  if (!invitation) {
    console.error(`could not apply accept invitation to task list succeeded event, invitation ${event.invitationId} not found`);
    return taskList;
  } else {
    return {
      ...taskList,
      invitations: taskList.invitations.filter((invitation) => invitation.invitationId !== event.invitationId),
      users: [...taskList.users, { role: invitation.inviteeRole, userId: invitation.inviteeId }],
      updatedAt: event.timestamp,
    };
  }
}

export type TaskListBase = {
  id: TaskListIdentifier;
  users: Permission[];
  invitations: Invitation[];
  tasks: Task[];
  status: 'active' | 'archived' | 'deleted';
};
export type TaskListSuccessEvent =
  | CreateTaskListSucceeded
  | RenameTaskListSucceeded
  | AddTaskToListSucceeded
  | DeleteTaskListSucceeded
  | InviteUserToTheTaskListSucceeded
  | AcceptInvitationToTaskListSucceeded;

export function createTaskListBase(taskListId: TaskListIdentifier) {
  return { id: taskListId, users: [], tasks: [], status: 'active' as const, invitations: [] };
}
