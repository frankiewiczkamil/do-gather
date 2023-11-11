import { Role } from '@/services/lists/model/TaskList';

export type InvitationStatus = 'pending' | 'accepted' | 'rejected';
export type Invitation = {
  id: string;
  taskListId: string;
  role: Role;
  userId: string;
  inviterId: string;
  status: InvitationStatus;
};
export type CreateInvitationDto = {
  taskListId: string;
  role: Role;
  userId: string;
  inviterId: string;
};
export type PreviewInvitationDto = {
  id: string;
  role: Role;
  tasksNumber: number;
  taskListName: string;
  ownerId: string;
  inviterId: string;
};
