import { getTaskList } from '@/services/lists/TaskListService';
import TaskPreview from '@/components/TaskPreview';
import { AddNewTask } from '@/components/AddNewTask';
import {
  createAddTaskToListAction,
  createDeleteTaskListAction,
  createInviteUserToTaskListAction,
  createRenameTaskListAction,
} from '@/app/task-lists/[id]/actions';
import Link from 'next/link';
import { RenameTaskList } from '@/components/RenameTaskList';
import { PATH } from '@/app/task-lists/common';
import { InviteUserToTaskList } from '@/components/InviteUserToTaskList';

type Params = { params: { id: string }; searchParams: Record<string, string> | undefined };
export default function TaskListMainView({ params, searchParams }: Params) {
  const { name, tasks } = getTaskList(params.id);
  return (
    <main className="flex min-h-screen flex-col items-start p-4 ">
      <div className="max-w-screen-xl w-full mx-auto border shadow rounded-lg">
        <div className="border-b bg-gray-50 w-full p-2">
          <h2 className="w-full text-xl ">{name}</h2>
        </div>
        <div className="flex w-full p-2">
          <div className="inline-flex rounded-md shadow-sm mx-auto" role="group">
            <Link href={`${params.id}?rename-task-list`}>
              <button
                id="rename-list"
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Rename this list
              </button>
            </Link>

            <Link href={`${params.id}?invite-user`}>
              <button
                id="invite-user"
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Invite user to this list
              </button>
            </Link>

            <form action={createDeleteTaskListAction(params.id)}>
              <button
                id="delete-list"
                type="submit"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Delete this list
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full items-center">{tasks.map(TaskPreview)}</div>
      <label htmlFor="add-task-to-list" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Add new task to the list &nbsp;
        <Link href={`${params.id}?new-task`}>
          <button
            id="add-task-to-list"
            type="button"
            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Add
          </button>
        </Link>
      </label>
      {searchParams?.hasOwnProperty('invite-user') && (
        <InviteUserToTaskList closePath={`${PATH}/${params.id}`} inviteUser={createInviteUserToTaskListAction(params.id)} />
      )}
      {searchParams?.hasOwnProperty('new-task') && <AddNewTask closePath={`${PATH}/${params.id}`} addTaskToListAction={createAddTaskToListAction(params.id)} />}
      {searchParams?.hasOwnProperty('rename-task-list') && (
        <RenameTaskList name={name} renameTaskListAction={createRenameTaskListAction(params.id)} closePath={`${PATH}/${params.id}`} />
      )}
    </main>
  );
}
