import { getTaskLists } from '@/services/lists/TaskListService';
import TaskListPreview from '@/components/TaskListPreview';
import { PATH } from '@/app/task-lists/common';
import { createTaskList } from '@/app/task-lists/actions';

// it seems that for some reason revalidation from [id]/action doesn't work, thus we need to force dynamic for now
export const dynamic = 'force-dynamic';
export default function TaskListMainView() {
  return (
    <main className="flex min-h-screen flex-col items-start p-4">
      <h2 className="border text-center w-full text-xl">All your lists</h2>
      <div className="w-full border">
        <h4 className="border w-full">Add new list</h4>
        <form action={createTaskList}>
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
  const allProps = toTaskPreviewListProps(taskList);
  // key extracted directly due: "Warning: A props object containing a "key" prop is being spread into JSX"
  return <TaskListPreview {...allProps} key={allProps.key} />;
}
