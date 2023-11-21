import { Invitation, TaskList, TaskListEventFailed, TaskListIdentifier, UserIdentifier } from '@/services/lists/TaskList';
import { applyTaskListEvent, createTaskListBase, TaskListBase, TaskListSuccessEvent } from '@/services/lists/infra/store/TaskListReducer';
import { getEventLog } from '@/services/lists/infra/store/TaskListEventStore';

let taskListByTaskListId: Record<TaskListIdentifier, TaskList | TaskListBase> = {};
let taskListIdByUserId: Record<UserIdentifier, TaskListIdentifier[]> = {};
let invitationByUserId: Record<UserIdentifier, Invitation2[]>;

function findTaskListById(id: string) {
  return taskListByTaskListId[id];
}

function findAllAllowedTaskListsForUser(ownerId: string) {
  return taskListIdByUserId[ownerId]?.map((id) => taskListByTaskListId[id]).filter((list) => list.status === 'active') as TaskList[];
}
function findAllInvitationsForUser(userId: string) {
  return invitationByUserId[userId] || [];
}

function calculateAllTaskListsState(taskListEvents: Array<TaskListEventFailed | TaskListSuccessEvent>): Record<string, TaskListBase | TaskList> {
  const result: Record<string, TaskList | TaskListBase> = {};
  return taskListEvents.reduce((acc, event) => {
    const taskListId = event.taskListId;
    const currentTaskList = acc[taskListId] || createTaskListBase(taskListId);
    acc[taskListId] = applyTaskListEvent(currentTaskList, event);
    return acc;
  }, result);
}
function buildTaskListByUserId(taskLists: TaskList[]) {
  return taskLists.reduce(
    (acc, taskList) => {
      const users = taskList.users;
      users.forEach((user) => {
        acc[user.userId] = acc[user.userId] || [];
        acc[user.userId].push(taskList.id);
      });
      return acc;
    },
    {} as Record<UserIdentifier, TaskListIdentifier[]>,
  );
}
type Invitation2 = { taskListId: TaskListIdentifier; inviterId: UserIdentifier } & Invitation;
function buildInvitationByUserId(taskLists: TaskList[]) {
  return taskLists.reduce(
    (acc, taskList) => {
      const invitations = taskList.invitations;
      invitations.forEach((invitation) => {
        acc[invitation.inviteeId] = acc[invitation.inviteeId] || [];
        acc[invitation.inviteeId].push({ taskListId: taskList.id, ...invitation });
      });

      return acc;
    },
    {} as Record<UserIdentifier, Invitation2[]>,
  );
}
function build() {
  taskListByTaskListId = calculateAllTaskListsState(getEventLog());
  taskListIdByUserId = buildTaskListByUserId(Object.values(taskListByTaskListId) as TaskList[]);
  invitationByUserId = buildInvitationByUserId(Object.values(taskListByTaskListId) as TaskList[]);
}
build();
export default {
  findTaskListById,
  findAllAllowedTaskListsForUser,
  findAllInvitationsForUser,
  build,
};
