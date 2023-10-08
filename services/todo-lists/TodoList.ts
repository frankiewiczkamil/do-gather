type TodoList = {
  id: string;
  name: string;
  tasks: Task[];
  // todo createdBy, users
};

type CreateTodoListDto = {
  name: string;
  tasks?: Task[];
};
