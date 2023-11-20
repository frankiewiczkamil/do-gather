import { TaskListEventFailed, TaskListIdentifier } from '@/services/lists/TaskList';
import { TaskListSuccessEvent } from '@/services/lists/infra/store/TaskListReducer';
import { calculateTaskListState } from '@/services/lists/infra/store/TaskListStateCalculator';
import { initialTaskListEvents } from '@/data/fakeData';

const taskListEvents: Array<TaskListEventFailed | TaskListSuccessEvent> = initialTaskListEvents;
export function selectTaskList(taskListId: TaskListIdentifier) {
  return calculateTaskListState(taskListEvents, taskListId);
}

export function publishTaskListEvent(event: TaskListEventFailed | TaskListSuccessEvent) {
  taskListEvents.push(event);
}

export function getEventLog() {
  return taskListEvents;
}
