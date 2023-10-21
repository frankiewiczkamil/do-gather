import { getTaskList } from '@/services/lists/TaskListService';
import TaskPreview from '@/components/TaskPreview';
import { createAddTaskToListAction, createDeleteTaskListAction, createRenameTaskListAction } from '@/app/task-lists/[id]/actions';
import { AddNewTask } from '@/components/AddNewTask';
import { EditList } from '@/components/EditTaskList';

type Params = { params: { id: string } };
export default function TaskListMainView({ params }: Params) {
  const { name, tasks } = getTaskList(params.id);
  return (
    <main className="flex min-h-screen flex-col items-start  p-4">
      <h2 className="border text-center w-full text-xl">{name}</h2>
      <div className="w-full border flex">
        <AddNewTask addTaskToListAction={createAddTaskToListAction(params.id)} />
        <EditList name={name} renameTaskListAction={createRenameTaskListAction(params.id)} deleteTaskListAction={createDeleteTaskListAction(params.id)} />
      </div>
      <div className="w-full items-center border">{tasks.map(TaskPreview)}</div>
    </main>
  );
}
