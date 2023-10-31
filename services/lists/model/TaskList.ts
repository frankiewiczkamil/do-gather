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
