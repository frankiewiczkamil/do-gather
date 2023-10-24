import Link from 'next/link';
import { Modal } from '@/components/Modal';

export function AddNew({ createTaskListAction, closePath }: { createTaskListAction: (formData: FormData) => Promise<void>; closePath: string }) {
  return (
    <Modal>
      <form action={createTaskListAction}>
        <div className="flex items-start justify-between p-3 border-b rounded-t dark:border-gray-600 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add new list</h3>
          <Link href={closePath}>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </Link>
        </div>

        <div className="flex p-4">
          <label htmlFor="new-task-list-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            List name
          </label>
          <input
            type="text"
            id="new-task-list-name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={'task list name'}
            defaultValue={'list name'}
            required
            name="name"
          />
        </div>

        <div className="flex items-center justify-end p-3 space-x-2 rounded-b dark:border-gray-600 ">
          <Link href={closePath}>
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Decline
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
