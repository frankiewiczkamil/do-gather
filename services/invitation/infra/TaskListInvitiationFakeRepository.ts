import { randomUUID } from 'crypto';
import { CreateInvitationDto, Invitation } from '@/services/invitation/Invitation';
import { TaskListInvitationCommand, TaskListInvitationQuery } from '@/services/invitation/InvitationServicePorts';

const taskListInvitations: Record<string, Invitation[]> = {
  halinka: [{ taskListId: 'list-2', role: 'editor', userId: 'halinka', id: '1', inviterId: 'zenek', status: 'pending' }],
};

function findInvitationByUserId(userId: string, status = 'pending' as const) {
  // console.log('userId', userId);
  // console.log('taskListInvitations', taskListInvitations);

  return taskListInvitations[userId].filter((invitation) => invitation.status === status) || [];
}
function saveInvitation(invitation: CreateInvitationDto) {
  if (!taskListInvitations[invitation.userId]) {
    taskListInvitations[invitation.userId] = [];
  }
  const invitationEntity = { ...invitation, id: randomUUID(), status: 'pending' as const };
  taskListInvitations[invitation.userId].push(invitationEntity);
  // console.log('invitation saved', invitationEntity);
  // console.log('taskListInvitations', taskListInvitations);
}
function findInvitationById(id: string) {
  const users = Object.keys(taskListInvitations);
  const invitations = users.map((user) => taskListInvitations[user]);
  return invitations.find((invitation) => invitation.find((i) => i.id === id))?.[0];
}

function updateInvitationStatus(id: string, status: 'accepted' | 'rejected') {
  const invitation = findInvitationById(id);
  if (invitation) {
    invitation.status = status;
  }
}

export default {
  findInvitationByUserId,
  saveInvitation,
  updateInvitationStatus,
} as TaskListInvitationQuery & TaskListInvitationCommand;
