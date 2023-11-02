export type InvitationPreviewRow = {
  id: string;
  taskListName: string;
  tasksNumber: number;
  role: string;
  ownerEmail: string;
  inviterEmail: string;
};
export type InvitationsProps = {
  elements: InvitationPreviewRow[];
  path: string;
};

export function Invitations({ elements, path }: InvitationsProps) {
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
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Owner
            </th>
            <th scope="col" className="px-6 py-3">
              Sent by
            </th>
            {/*<th scope="col" className="px-6 py-3">*/}
            {/*  Action*/}
            {/*</th>*/}
          </tr>
        </thead>
        <tbody>{elements.map(createToTaskListPreview(path))}</tbody>
      </table>
    </div>
  );
}

function InvitationRow({ taskListName, tasksNumber, role, ownerEmail, url, inviterEmail }: InvitationPreviewRow & { url: string; key: string }) {
  return (
    <tr className="bg-white dark:bg-gray-800">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {taskListName}
      </th>
      <td className="px-6 py-4">{tasksNumber}</td>
      <td className="px-6 py-4">{role}</td>
      <td className="px-6 py-4">{ownerEmail}</td>
      <td className="px-6 py-4">{inviterEmail}</td>
      {/*<td className="px-6 py-4">*/}
      {/*  <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={acceptUrl}>*/}
      {/*    accept*/}
      {/*  </Link>*/}
      {/*</td>*/}
    </tr>
  );
}

function createToTaskListPreview(path: string) {
  return function toTaskListPreview(element: InvitationPreviewRow) {
    const allProps = toInvitationPreviewListProps(element, path);
    // key extracted directly due: "Warning: A props object containing a "key" prop is being spread into JSX"
    return <InvitationRow {...allProps} key={allProps.key} />;
  };
}

function toInvitationPreviewListProps(invitation: InvitationPreviewRow, path: string): InvitationPreviewRow & { url: string; key: string } {
  return { ...invitation, url: `${path}/${invitation.id}`, key: invitation.id };
}
