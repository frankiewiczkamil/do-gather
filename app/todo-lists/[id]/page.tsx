import { addTask, getTasks } from '@/services/todo-lists/todoListService';
import TaskPreview from '@/components/TaskPreview';

type PageProps = {
  params: { id: string };
  searchParams?: CreateTaskDto;
};

export default function TodoList({ params, searchParams }: PageProps) {
  // this will be most likely replaced by next's server actions (it's not a stable feature yet)
  if (typeof searchParams?.name === 'string') {
    addTask(params.id, searchParams);
  }
  return (
    <main className="flex min-h-screen flex-col items-start  p-4">
      <h2 className="border text-center w-full text-xl">Tasks to be done</h2>
      <div className="w-full border">
        <h4 className="border w-full">Add new task</h4>
        <form>
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

      <div className="w-full items-center border">{getTasks(params.id).map(TaskPreview)}</div>
    </main>
  );
}
