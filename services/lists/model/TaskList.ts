export type TaskList = {
  id: string;
  name: string;
  tasks: Task[];
  ownerId: string;
  users: Permission[];
};

export type CreateTaskListDto = {
  name: string;
  tasks?: Task[];
  ownerId: string;
};

export type Role = 'editor' | 'viewer';
export type Permission = {
  role: Role;
  userId: string;
};

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
