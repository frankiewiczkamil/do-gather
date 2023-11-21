import { PreviewInvitationDto } from '@/services/lists/invitation/Invitation';
import { publishTaskListEvent, selectTaskList } from '@/services/lists/infra/store/TaskListEventStore';
import { TaskList } from '@/services/lists/TaskList';
import acceptInvitationToTaskList from '@/services/lists/aggregate/acceptInvitation';
import taskListRepository from '@/services/lists/infra/TaskListReadModel';
import inviteUserToTheTaskList from '@/services/lists/aggregate/inviteUser';
import { randomUUID } from 'crypto';

export function inviteUserToTaskList(userId: string, taskListId: string, inviterId: string, isEditor: boolean = false) {
  const event = inviteUserToTheTaskList(selectTaskList(taskListId), {
    taskListId,
    authorId: inviterId,
    timestamp: Date.now(),
    inviteeId: userId,
    inviteeRole: isEditor ? 'editor' : 'viewer',
    invitationId: randomUUID(),
  });
  publishTaskListEvent(event);
  taskListRepository.build();
}

export function getInvitations(userId: string, status = 'pending' as const): PreviewInvitationDto[] {
  const invitations = taskListRepository.findAllInvitationsForUser(userId);
  return invitations
    .filter((invitation) => invitation.status === status)
    .map((invitation) => {
      const taskList = selectTaskList(invitation.taskListId) as TaskList;
      return {
        role: invitation.inviteeRole,
        tasksNumber: taskList.tasks.length,
        taskListName: taskList.name,
        ownerId: taskList.ownerId,
        id: invitation.invitationId,
        inviterId: invitation.inviterId,
      };
    });
}

export function acceptInvitation(invitationId: string, userId: string) {
  const invitation = taskListRepository.findAllInvitationsForUser(userId).find((i) => i.invitationId === invitationId);
  if (!invitation) {
    throw new Error(`Invitation ${invitationId} not found`);
  }
  if (invitation.inviteeId !== userId) {
    throw new Error(`Invitation ${invitationId} is not for user ${userId}`);
  }
  const taskList = taskListRepository.findTaskListById(invitation.taskListId) as TaskList;

  const event = acceptInvitationToTaskList(taskList, { taskListId: taskList.id, authorId: userId, timestamp: Date.now(), invitationId });
  publishTaskListEvent(event);
  taskListRepository.build();
}
