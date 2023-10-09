export type TaskListCommand = {
  saveTaskList: (taskList: TaskList) => void;
  saveTask: (taskListId: string, task: Task) => void;
};
export type TaskListQuery = {
  findTaskListById: (id: string) => TaskList;
  findAllTaskLists: () => TaskList[];
};
