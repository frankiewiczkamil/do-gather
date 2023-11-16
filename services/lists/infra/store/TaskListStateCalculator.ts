import { TaskListEvent, TaskListEventFailed, TaskListIdentifier } from '@/services/lists/TaskList';
import { applyTaskListEvent, createTaskListBase, TaskListSuccessEvent } from '@/services/lists/infra/store/TaskListReducer';

// this is a naive implementation of a reducer, as it uses an array of events instead of a stream (for sake of simplicity)
// it should be implemented as some sort of stream instead in a real application
export function calculateTaskListState(taskList: Array<TaskListEventFailed | TaskListSuccessEvent>, taskListId: TaskListIdentifier) {
  return taskList.filter(isApplicableEventFactory(taskListId)).reduce(applyTaskListEvent, createTaskListBase(taskListId));
}

function isApplicableEventFactory(taskListId: TaskListIdentifier) {
  return (event: TaskListEvent | TaskListSuccessEvent) => event.taskListId === taskListId && event.status === 'succeeded';
}
