import { addTask, deleteTaskList, renameTaskList } from '@/services/lists/TaskListService';
import { inviteUserToTaskList } from '@/services/lists/invitation/InvitationService';
import { PATH } from '@/app/task-lists/common';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUserIdByEmail } from '@/services/users/UsersService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export function createAddTaskToListAction(taskListId: string) {
  return async function addTaskToListAction(formData: FormData) {
    'use server';
    const session = await getServerSession(authOptions);
    const author = session?.user as { id: string };
    const createTaskDto = formDataToCreateTaskListDto(formData);
    addTask(taskListId, createTaskDto, author?.id);
    revalidatePath(`${PATH}/${taskListId}`);
    revalidatePath(PATH); // it doesn't work for now (v13.5.5), thus task-list uses const dynamic = 'force-dynamic' as a workaround
  };
}

function formDataToCreateTaskListDto(formData: FormData) {
  return {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
  };
}

export function createDeleteTaskListAction(taskListId: string) {
  return async function deleteTaskListAction() {
    'use server';
    const session = await getServerSession(authOptions);
    const author = session?.user as { id: string };
    deleteTaskList(taskListId, author.id);
    revalidatePath(PATH);
    redirect(PATH);
  };
}

export function createRenameTaskListAction(taskListId: string) {
  return async function renameTaskAction(formData: FormData) {
    'use server';
    const { name } = formDataToRenameTaskListDto(formData);
    const session = await getServerSession(authOptions);
    const author = session?.user as { id: string };
    renameTaskList(taskListId, name, author.id);
    revalidatePath(PATH);
  };
}
function formDataToRenameTaskListDto(formData: FormData) {
  return {
    name: formData.get('new-task-list-name') as string,
  };
}

export function createInviteUserToTaskListAction(taskListId: string) {
  return async function inviteUserToTaskListAction(formData: FormData) {
    'use server';
    const { userEmail, isEditor } = formDataToInviteUserToTaskListDto(formData);
    const userId = getUserIdByEmail(userEmail);
    const session = await getServerSession(authOptions);
    const inviter = session?.user as { id: string };
    inviteUserToTaskList(userId, taskListId, inviter.id, isEditor);
  };
}

function formDataToInviteUserToTaskListDto(formData: FormData) {
  console.log('formDataToInviteUserToTaskListDto', formData.get('is-editor'), formData.get('user-email'));
  return {
    userEmail: formData.get('user-email') as string,
    isEditor: formData.get('is-editor') === 'is-editor',
  };
}
