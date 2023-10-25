import { Modal } from '@/components/modal/Modal';
import { TitleBar } from '@/components/modal/TitleBar';
import { ModalButtons } from '@/components/modal/ModalButtons';

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
        <ModalButtons closePath={closePath} submitText="Add" />
      </form>
    </Modal>
  );
}
