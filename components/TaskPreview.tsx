export default function TaskPreview({ name, description, status }: Task) {
  return (
    <div className="flex space-x-1 border" key={name}>
      <div className="basis-2/12">{name}</div>
      <div className="basis-8/12 text-justify max-h-12 overflow-hidden">{description}</div>
      <div className="basis-2/12 text-center">{status}</div>
    </div>
  );
}
