import { randomUUID } from 'crypto';
import { TaskListInvitationCommand, TaskListInvitationQuery } from '@/services/lists/TaskListPorts';

const taskListInvitations: Record<string, Invitation[]> = {
  halinka: [{ taskListId: 'list-1', role: 'editor', userId: 'halinka', id: '1', inviterId: 'halinka' }],
};

function findInvitationByUserId(userId: string) {
  // console.log('userId', userId);
  // console.log('taskListInvitations', taskListInvitations);

  return taskListInvitations[userId] || [];
}
function saveInvitation(invitation: CreateInvitationDto) {
  if (!taskListInvitations[invitation.userId]) {
    taskListInvitations[invitation.userId] = [];
  }
  const invitationEntity = { ...invitation, id: randomUUID() };
  taskListInvitations[invitation.userId].push(invitationEntity);
  // console.log('invitation saved', invitationEntity);
  // console.log('taskListInvitations', taskListInvitations);
}

export default {
  findInvitationByUserId,
  saveInvitation,
} as TaskListInvitationQuery & TaskListInvitationCommand;
