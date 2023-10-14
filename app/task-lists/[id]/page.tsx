import { getTaskList } from '@/services/lists/TaskListService';
import TaskPreview from '@/components/TaskPreview';
import { createAddTaskToListAction } from '@/app/task-lists/[id]/actions';

type Params = { params: { id: string } };
export default function TaskListMainView({ params }: Params) {
  const { name, tasks } = getTaskList(params.id);
  return (
    <main className="flex min-h-screen flex-col items-start  p-4">
      <h2 className="border text-center w-full text-xl">{name}</h2>
      <div className="w-full border">
        <h4 className="border w-full">Add new task</h4>
        <form action={createAddTaskToListAction(params.id)}>
          <div>
            <label htmlFor="new-task-name" className="">
              Task name
            </label>
            <input type="text" id="new-task-name" name="name" className="border" placeholder={'task name'} defaultValue={'task name'} />
          </div>
          <div>
            <label htmlFor="new-task-description" className="">
              Task name
            </label>
            <textarea id="new-task-description" name="description" className="border" placeholder={'task description'} defaultValue={'task description'} />
          </div>
          <button type="submit" className="border-2">
            Add
          </button>
        </form>
      </div>

      <div className="w-full items-center border">{tasks.map(TaskPreview)}</div>
    </main>
  );
}
