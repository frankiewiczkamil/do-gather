import { Modal } from '@/components/modal/Modal';
import { TitleBar } from '@/components/modal/TitleBar';
import { ModalButtons } from '@/components/modal/ModalButtons';

type Props = { name: string; renameTaskListAction: (formData: FormData) => Promise<void>; closePath: string };
export function RenameTaskList({ name, renameTaskListAction, closePath }: Props) {
  return (
    <Modal>
      <form action={renameTaskListAction}>
        <TitleBar title="Rename task list" closePath={closePath} />

        <div className="flex p-4">
          <label htmlFor="new-task-list-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Rename task list
          </label>
          <input
            type={'text'}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={name}
            id={'new-task-list-name'}
            name={'new-task-list-name'}
          />
        </div>
        <ModalButtons closePath={closePath} submitText="Rename" />
      </form>
    </Modal>
  );
}
