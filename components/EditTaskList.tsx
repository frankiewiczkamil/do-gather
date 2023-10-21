type EditListProps = {
  name: string;
  renameTaskListAction: (formData: FormData) => Promise<void>;
  deleteTaskListAction: (formData: FormData) => Promise<void>;
};
export function EditList({ name, renameTaskListAction, deleteTaskListAction }: EditListProps) {
  return (
    <div className="border border-red-600 inline-block basis-1/2">
      <h4 className="border w-full">List settings</h4>
      <form action={renameTaskListAction}>
        <label htmlFor="new-task-list-name">Rename task list</label>
        <input type={'text'} className="border" defaultValue={name} id={'new-task-list-name'} name={'new-task-list-name'} />
        <button className="border-2" type="submit">
          update
        </button>
      </form>
      <form>
        <button className="border-2" formAction={deleteTaskListAction}>
          Delete list
        </button>
      </form>
    </div>
  );
}
