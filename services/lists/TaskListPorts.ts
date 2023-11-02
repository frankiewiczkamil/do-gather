export type TaskListCommand = {
  saveTaskList: (taskList: TaskList) => void;
  saveTask: (taskListId: string, task: Task) => void;
  deleteTaskList: (taskListId: string) => void;
  updateTaskListName: (taskListId: string, newName: string) => void;
};
export type TaskListQuery = {
  findTaskListById: (id: string) => TaskList;
  findAllTaskLists: () => TaskList[];
  findAllAllowedTaskListsForUser: (ownerId: string) => TaskList[];
};

export type TaskListInvitationQuery = {
  findInvitationByUserId: (userId: string) => Invitation[];
};

export type TaskListInvitationCommand = {
  saveInvitation: (invitation: CreateInvitationDto) => void;
};

export type GetUserEmailById = (id: string) => string;
