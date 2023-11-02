import Link from 'next/link';

export function TaskListsTable(props: { taskLists: TaskList[]; path: string }) {
  return props.taskLists?.length > 0 ? <TableHeader {...props} /> : <NoTaskLists />;
}

function TableHeader({ taskLists, path }: { taskLists: TaskList[]; path: string }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              tasks
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{taskLists.map(createToTaskListPreview(path))}</tbody>
      </table>
    </div>
  );
}

function TaskListRow({ name, tasks, url }: TaskList & { url: string; key: string }) {
  return (
    <tr className="bg-white dark:bg-gray-800">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {name}
      </th>
      <td className="px-6 py-4">{tasks.length}</td>
      <td className="px-6 py-4">
        <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={url}>
          edit
        </Link>
      </td>
    </tr>
  );
}

function NoTaskLists() {
  return <div className="items-center">No lists yet</div>;
}

function createToTaskListPreview(path: string) {
  return function toTaskListPreview(taskList: TaskList) {
    const allProps = toTaskPreviewListProps(taskList, path);
    // key extracted directly due: "Warning: A props object containing a "key" prop is being spread into JSX"
    return <TaskListRow {...allProps} key={allProps.key} />;
  };
}

function toTaskPreviewListProps(list: TaskList, path: string) {
  return { ...list, url: `${path}/${list.id}`, key: list.id };
}
