import { Modal } from '@/components/modal/Modal';
import { TitleBar } from '@/components/modal/TitleBar';
import { ModalButtons } from '@/components/modal/ModalButtons';

type AddNewTaskProps = {
  inviteUser: (formData: FormData) => Promise<void>;
  closePath: string;
};
export function InviteUserToTaskList({ inviteUser, closePath }: AddNewTaskProps) {
  return (
    <Modal>
      <TitleBar closePath={closePath} title="Invite user to task list" />

      <form action={inviteUser}>
        <div className="p-4 inline-block">
          <label htmlFor="user-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            User
          </label>
          <input
            type="text"
            id="user-email"
            className="w-96 block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={"user's email"}
            required
            name="user-email"
          />
        </div>
        <div className="p-4 inline-block">
          <label htmlFor="new-task-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Editor
          </label>
          <input
            id="new-task-name"
            name="is-editor"
            type="checkbox"
            value={'is-editor'}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <ModalButtons closePath={closePath} submitText="Add" />
      </form>
    </Modal>
  );
}
