import { PATH } from '@/app/task-lists/common';
import { addTaskList } from '@/services/lists/TaskListService';
import { acceptInvitation } from '@/services/invitation/InvitationService';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export function createTaskListFactory(authorId: string) {
  return async function createTaskList(formData: FormData) {
    'use server';
    const taskList = { ...formDataToCreateTaskListDto(formData), authorId };
    addTaskList(taskList);
    revalidatePath(PATH);
  };
}

function formDataToCreateTaskListDto(formData: FormData) {
  return {
    name: formData.get('name') as string,
  };
}

export function createAcceptInvitationAction(invitationId: string) {
  return async function acceptInvitationAction(_formData: FormData) {
    'use server';
    const session = await getServerSession(authOptions);
    const user = session?.user as { id: string };
    acceptInvitation(invitationId, user.id);
    revalidatePath(PATH);
  };
}
