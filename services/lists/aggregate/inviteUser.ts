import { TaskList, TaskListEventFailed, TaskListEventSucceeded, TaskListIdentifier, UserIdentifier } from '@/services/lists/TaskList';

type InviteUserToTheTaskListFailed = TaskListEventFailed & {
  type: 'invite-user-to-task-list-failed';
};
export type InviteUserToTheTaskListSucceeded = TaskListEventSucceeded & {
  type: 'invite-user-to-task-list-succeeded';
  inviteeId: UserIdentifier;
  inviteeRole: 'editor' | 'viewer';
  invitationId: string;
};

type InviteUserToTheTaskListEvent = InviteUserToTheTaskListFailed | InviteUserToTheTaskListSucceeded;
export type InviteUserToTheTaskListArgs = {
  taskListId: TaskListIdentifier;
  authorId: UserIdentifier;
  timestamp: number;
  inviteeId: UserIdentifier;
  inviteeRole: 'editor' | 'viewer';
  invitationId: string;
};

export default function inviteUserToTheTaskList(
  taskList: TaskList,
  { taskListId, authorId, timestamp, inviteeId, inviteeRole, invitationId }: InviteUserToTheTaskListArgs,
): InviteUserToTheTaskListEvent {
  let result: InviteUserToTheTaskListEvent;
  if (!taskList) {
    result = buildFailEvent(taskListId, timestamp, authorId, `Task list with id ${taskListId} not found`);
  } else if (taskList.users.some((user) => user.userId === inviteeId)) {
    result = buildFailEvent(taskListId, timestamp, authorId, `User ${inviteeId} is already on the list`);
  } else if (taskList.users.some((user) => user.userId === authorId && user.role === 'viewer')) {
    result = buildFailEvent(taskListId, timestamp, authorId, `User ${authorId} is not allowed to invite users to the list`);
  } else
    result = {
      type: 'invite-user-to-task-list-succeeded',
      taskListId,
      timestamp,
      authorId,
      inviteeId,
      inviteeRole,
      status: 'succeeded',
      invitationId,
    };
  return result;
}

function buildFailEvent(taskListId: TaskListIdentifier, timestamp: number, authorId: UserIdentifier, error: string): InviteUserToTheTaskListFailed {
  return {
    type: 'invite-user-to-task-list-failed',
    taskListId,
    timestamp,
    authorId,
    status: 'failed',
    error,
  };
}
