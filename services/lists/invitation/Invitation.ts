import { Role } from '@/services/lists/TaskList';

export type PreviewInvitationDto = {
  id: string;
  role: Role;
  tasksNumber: number;
  taskListName: string;
  ownerId: string;
  inviterId: string;
};
