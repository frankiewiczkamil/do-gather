type Task = {
  id: string;
  name: string;
  description: string;
  status: string;
};

type CreateTaskDto = {
  name: string;
  description: string;
};
