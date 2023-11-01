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
};

type InvitationDto = {
  taskListId: string;
  role: Role;
  userId: string;
};
