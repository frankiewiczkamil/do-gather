import { getTaskLists } from '@/services/lists/TaskListService';
import TaskListPreview from '@/components/TaskListPreview';
import { PATH } from '@/app/task-lists/common';
import { createTaskList } from '@/app/task-lists/actions';
import Link from 'next/link';
import { AddNew } from '@/components/CreateTaskList';

// it seems that for some reason revalidation from [id]/action doesn't work, thus we need to force dynamic for now
export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Record<string, string> | undefined;
};
export default function TaskListMainView({ searchParams }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-start p-4">
      <h2 className="text-center w-full text-xl">All your lists</h2>

      {searchParams?.hasOwnProperty('new') && <AddNew createTaskListAction={createTaskList} closePath={PATH} />}

      <div className="w-full items-center border">{getTaskLists().map(toTaskListPreview)}</div>
      <Link href={`${PATH}?new`}>new +</Link>
    </main>
  );
}

function toTaskPreviewListProps(list: TaskList) {
  return { ...list, url: `${PATH}/${list.id}`, key: list.id };
}

function toTaskListPreview(taskList: TaskList) {
  const allProps = toTaskPreviewListProps(taskList);
  // key extracted directly due: "Warning: A props object containing a "key" prop is being spread into JSX"
  return <TaskListPreview {...allProps} key={allProps.key} />;
}
