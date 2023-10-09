import { getTaskLists } from '@/services/lists/TaskListService';
import TaskListPreview from '@/components/TaskListPreview';
import { PATH } from '@/app/task-lists/common';
import { create } from '@/app/task-lists/actions';

export default function TaskListMainView() {
  return (
    <main className="flex min-h-screen flex-col items-start p-4">
      <h2 className="border text-center w-full text-xl">All your lists</h2>
      <div className="w-full border">
        <h4 className="border w-full">Add new list</h4>
        <form action={create}>
          <div>
            <label htmlFor="new-task-list-name" className="">
              List name
            </label>
            <input type="text" id="new-task-list-name" name="name" className="border" placeholder={'task list name'} defaultValue={'list name'} />
          </div>
          <button type="submit" className="border-2">
            Add
          </button>
        </form>
      </div>

      <div className="w-full items-center border">{getTaskLists().map(toTaskListPreview)}</div>
    </main>
  );
}

function toTaskPreviewListProps(list: TaskList) {
  return { ...list, url: `${PATH}/${list.id}`, key: list.id };
}

function toTaskListPreview(taskList: TaskList) {
  return <TaskListPreview {...toTaskPreviewListProps(taskList)} />;
}
