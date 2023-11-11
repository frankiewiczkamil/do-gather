import taskListInvitiationFakeRepository from '@/services/invitation/infra/TaskListInvitiationFakeRepository';
import taskListRepository from '@/services/lists/infra/TaskListFakeRepository';
import { PreviewInvitationDto } from './Invitation';

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
