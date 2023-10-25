import { Modal } from '@/components/modal/Modal';
import { TitleBar } from '@/components/modal/TitleBar';
import Link from 'next/link';

type AddNewTaskProps = {
  addTaskToListAction: (formData: FormData) => Promise<void>;
  closePath: string;
};
export function AddNewTask({ addTaskToListAction, closePath }: AddNewTaskProps) {
  return (
    <Modal>
      <TitleBar closePath={closePath} title="Add new task to the list" />

      <form action={addTaskToListAction}>
        <div className="p-4">
          <label htmlFor="new-task-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Task name
          </label>
          <input
            type="text"
            id="new-task-name"
            className="w-96 block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={'task name'}
            defaultValue={'task name'}
            required
            name="name"
          />
        </div>
        <div className="p-4">
          <label htmlFor="new-task-description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Task description
          </label>
          <textarea
            id="new-task-description"
            name="description"
            rows={3}
            placeholder={'task description'}
            defaultValue={'task description'}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
        <div className="flex items-center justify-end p-3 space-x-2 rounded-b dark:border-gray-600 ">
          <Link href={closePath}>
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
          </Link>

          <button
            data-modal-hide="defaultModal"
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
}
