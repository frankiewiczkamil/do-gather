export type Task = {
  id: string;
  name: string;
  description?: string;
  status: 'new' | 'in-progress' | 'done';
};

export type CreateTaskDto = {
  name: string;
  description?: string;
};
