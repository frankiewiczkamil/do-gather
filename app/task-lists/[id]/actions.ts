import { addTask, deleteTaskList } from '@/services/lists/TaskListService';
import { PATH } from '@/app/task-lists/common';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export function createAddTaskToListAction(taskListId: string) {
  return async function addTaskToListAction(formData: FormData) {
    'use server';
    const createTaskDto = formDataToCreateTaskListDto(formData);
    addTask(taskListId, createTaskDto);
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
    deleteTaskList(taskListId);
    revalidatePath(PATH);
    redirect(PATH);
  };
}
