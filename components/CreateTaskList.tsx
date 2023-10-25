import { Modal } from '@/components/modal/Modal';
import { TitleBar } from '@/components/modal/TitleBar';
import { ModalButtons } from '@/components/modal/ModalButtons';

export function AddNew({ createTaskListAction, closePath }: { createTaskListAction: (formData: FormData) => Promise<void>; closePath: string }) {
  return (
    <Modal>
      <form action={createTaskListAction}>
        <TitleBar closePath={closePath} title="Add new task list" />

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

        <ModalButtons closePath={closePath} submitText="Add" />
      </form>
    </Modal>
  );
}
