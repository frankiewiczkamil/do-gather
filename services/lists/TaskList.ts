type TaskList = {
  id: string;
  name: string;
  tasks: Task[];
};

type CreateTaskListDto = {
  name: string;
  tasks?: Task[];
};
