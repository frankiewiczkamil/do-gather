export type TaskListCommand = {
  saveTaskList: (taskList: TaskList) => void;
  saveTask: (taskListId: string, task: Task) => void;
  deleteTaskList: (taskListId: string) => void;
};
export type TaskListQuery = {
  findTaskListById: (id: string) => TaskList;
  findAllTaskLists: () => TaskList[];
};
