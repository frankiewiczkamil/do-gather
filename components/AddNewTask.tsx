type AddNewTaskProps = {
  addTaskToListAction: (formData: FormData) => Promise<void>;
};
export function AddNewTask({ addTaskToListAction }: AddNewTaskProps) {
  return (
    <div className="border border-cyan-300 inline-block basis-1/2">
      <h4 className="border w-full">Add new task</h4>
      <form action={addTaskToListAction}>
        <div>
          <label htmlFor="new-task-name" className="">
            Task name
          </label>
          <input type="text" id="new-task-name" name="name" className="border" placeholder={'task name'} defaultValue={'task name'} />
        </div>
        <div>
          <label htmlFor="new-task-description" className="">
            Task name
          </label>
          <textarea id="new-task-description" name="description" className="border" placeholder={'task description'} defaultValue={'task description'} />
        </div>
        <button type="submit" className="border-2">
          Add
        </button>
      </form>
    </div>
  );
}
