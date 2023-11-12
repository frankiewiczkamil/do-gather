export type Task = {
  id: string;
  name: string;
  description: string;
  status: string;
};

export type CreateTaskDto = {
  name: string;
  description: string;
};
