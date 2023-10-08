import Link from 'next/link';
export default function TodoListPreview({ name, tasks, id, url }: TodoList & { url: string }) {
  return (
    <div className="flex space-x-1 border" key={name}>
      <div className="basis-3/12">{name}</div>
      <div className="basis-1/12 text-justify max-h-12 overflow-hidden">{tasks.length} elements</div>
      <div className="basis-3/12 ">
        <Link href={url}>klik</Link>
      </div>
    </div>
  );
}
