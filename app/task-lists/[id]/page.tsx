import { getTaskList } from '@/services/lists/TaskListService';
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
import { TasksTable } from '@/components/TasksTable';

type Params = { params: { id: string }; searchParams: Record<string, string> | undefined };
export default function TaskListMainView({ params, searchParams }: Params) {
  const { name, tasks } = getTaskList(params.id);
  return (
    <main className="flex min-h-screen flex-col items-start p-4 ">
      <div className="max-w-screen-xl w-full mx-auto border shadow rounded-lg ">
        <div className="border-b bg-gray-50 w-full p-2">
          <div className="flex w-full p-2 justify-between align-bottom">
            <div className="my-auto">
              <h2 className="w-full text-xl ">{name}</h2>
            </div>
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <Link href={`${params.id}?rename-task-list`}>
                <button
                  id="rename-list"
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  Rename
                </button>
              </Link>

              <Link href={`${params.id}?invite-user`}>
                <button
                  id="invite-user"
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  Invite a user
                </button>
              </Link>

              <form action={createDeleteTaskListAction(params.id)}>
                <button
                  id="delete-list"
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
        <TasksTable tasks={tasks} />

        <Link href={`${params.id}?new-task`} className={'w-full'}>
          <button
            id="add-task-to-list"
            type="button"
            className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
              <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
            </svg>
          </button>
        </Link>
      </div>
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
