import { TaskList, TaskListEventFailed, TaskListEventSucceeded } from '@/services/lists/TaskList';

type AcceptInvitationToTaskListFailed = TaskListEventFailed & {
  type: 'accept-invitation-to-task-list-failed';
};
export type AcceptInvitationToTaskListSucceeded = TaskListEventSucceeded & {
  type: 'accept-invitation-to-task-list-succeeded';
  invitationId: string;
};

type AcceptInvitationToTaskListEvent = AcceptInvitationToTaskListFailed | AcceptInvitationToTaskListSucceeded;

export type AcceptInvitationToTaskListArgs = {
  taskListId: string;
  invitationId: string;
  authorId: string;
  timestamp: number;
};

export default function acceptInvitationToTaskList(
  taskList: TaskList,
  { taskListId, authorId, timestamp, invitationId }: AcceptInvitationToTaskListArgs,
): AcceptInvitationToTaskListEvent {
  if (taskList.users.some((user) => user.userId === authorId)) {
    return {
      type: 'accept-invitation-to-task-list-failed',
      taskListId,
      timestamp,
      authorId,
      status: 'failed',
      error: `User ${authorId} is already on the list`,
    };
  }
  return {
    type: 'accept-invitation-to-task-list-succeeded',
    taskListId,
    invitationId,
    timestamp,
    authorId,
    status: 'succeeded',
  };
}
