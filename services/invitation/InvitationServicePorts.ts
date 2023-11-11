import { CreateInvitationDto, Invitation, InvitationStatus } from '@/services/invitation/Invitation';

export type TaskListInvitationQuery = {
  findInvitationByUserId: (userId: string, status?: InvitationStatus) => Invitation[];
};
export type TaskListInvitationCommand = {
  saveInvitation: (invitation: CreateInvitationDto) => void;
  updateInvitationStatus: (id: string, status: InvitationStatus) => void;
};