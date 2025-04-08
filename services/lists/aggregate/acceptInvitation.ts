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
  const invitation = taskList.invitations.find((invitation) => invitation.invitationId === invitationId);

  if (!invitation) {
    return {
      type: 'accept-invitation-to-task-list-failed',
      taskListId,
      timestamp,
      authorId,
      status: 'failed',
      error: `Invitation ${invitationId} does not exist`,
    };
  }
  const inviteeId = invitation.inviteeId;
  if (taskList.users.some((user) => user.userId === inviteeId)) {
    return {
      type: 'accept-invitation-to-task-list-failed',
      taskListId,
      timestamp,
      authorId,
      status: 'failed',
      error: `User ${inviteeId} is already on the list`,
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
