export default function TaskPreview({ name, description, status, id }: Task) {
  return (
    <div className="flex space-x-1" key={id}>
      <div className="basis-2/12">{name}</div>
      <div className="basis-8/12 text-justify max-h-12 overflow-hidden">{description}</div>
      <div className="basis-2/12 text-center">{status}</div>
    </div>
  );
}
