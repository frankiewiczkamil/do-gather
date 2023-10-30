type TaskList = {
  id: string;
  name: string;
  tasks: Task[];
  ownerId: string;
};

type CreateTaskListDto = {
  name: string;
  tasks?: Task[];
  ownerId: string;
};
