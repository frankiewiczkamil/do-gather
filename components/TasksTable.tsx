import { Task } from '@/services/lists/model/Task';

export function TasksTable(props: { tasks: Task[] }) {
  return props.tasks?.length > 0 ? <TableHeader {...props} /> : <NoTask />;
}

function TableHeader({ tasks }: { tasks: Task[] }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full">
        <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>{tasks.map(toTaskPreview)}</tbody>
      </table>
    </div>
  );
}

function TaskRow({ name, description, status }: Task & { key: string }) {
  return (
    <tr className="bg-white dark:bg-gray-800">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {name}
      </th>
      <td className="px-6 py-4">{description}</td>
      <td className="px-6 py-4">{status}</td>
    </tr>
  );
}

function NoTask() {
  return <div className="items-center">No tasks yet</div>;
}

function toTaskPreview(task: Task) {
  return <TaskRow {...task} key={task.id} />;
}
