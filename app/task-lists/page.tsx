import { getInvitations, getTaskLists } from '@/services/lists/TaskListService';
import { PATH } from '@/app/task-lists/common';
import { createAcceptInvitationAction, createTaskListFactory } from '@/app/task-lists/actions';
import Link from 'next/link';
import { AddNew } from '@/components/CreateTaskList';
import { TaskListsTable } from '@/components/TaskListPreview';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { InvitationPreviewRow, Invitations } from '@/components/Invitations';
import { getUserEmailById } from '@/services/users/UsersService';

// it seems that for some reason revalidation from [id]/action doesn't work, thus we need to force dynamic for now
export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Record<string, string> | undefined;
};
export default async function TaskListMainView({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { id: string };
  const taskLists = getTaskLists(user.id);
  const createTaskListCallback = createTaskListFactory(user.id);
  const invitations = getInvitations(user.id).map(invitationPreviewDtoToInvitationProps);
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h2 className="text-center w-full text-xl pb-3">All your lists</h2>

      {searchParams?.hasOwnProperty('new') && <AddNew createTaskListAction={createTaskListCallback} closePath={PATH} />}
      <div className="max-w-screen-xl w-full mx-auto">
        <TaskListsTable taskLists={taskLists} path={PATH} />
        <div className="float-right pt-2">
          <Link href={`${PATH}?new`}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              new +
            </button>
          </Link>
        </div>
      </div>
      {invitations.length ? (
        <div className="max-w-screen-xl w-full mx-auto">
          <h2 className="text-center w-full text-xl pb-3">Invitations</h2>
          <Invitations elements={invitations} path={PATH} createAcceptInvitationAction={createAcceptInvitationAction} />
        </div>
      ) : null}
    </main>
  );
}

function invitationPreviewDtoToInvitationProps(invitation: PreviewInvitationDto): InvitationPreviewRow {
  return {
    id: invitation.id,
    taskListName: invitation.taskListName,
    tasksNumber: invitation.tasksNumber,
    role: invitation.role,
    ownerEmail: getUserEmailById(invitation.ownerId),
    inviterEmail: getUserEmailById(invitation.inviterId),
    // acceptUrl
  };
}
