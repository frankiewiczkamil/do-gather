type TaskList = {
  id: string;
  name: string;
  tasks: Task[];
  ownerId: string;
  users: Permission[];
};

type CreateTaskListDto = {
  name: string;
  tasks?: Task[];
  ownerId: string;
  users: Permission[];
};

type Role = 'editor' | 'viewer';
type Permission = {
  role: Role;
  userId: string;
};

type Invitation = {
  id: string;
  taskListId: string;
  role: Role;
  userId: string;
  inviterId: string;
};

type CreateInvitationDto = {
  taskListId: string;
  role: Role;
  userId: string;
  inviterId: string;
};

type PreviewInvitationDto = {
  id: string;
  role: Role;
  tasksNumber: number;
  taskListName: string;
  ownerId: string;
  inviterId: string;
};
