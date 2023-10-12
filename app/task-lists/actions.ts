import { PATH } from '@/app/task-lists/common';
import { addTaskList } from '@/services/lists/TaskListService';
import { revalidatePath } from 'next/cache';

export async function createTaskList(formData: FormData) {
  'use server';
  addTaskList(formDataToCreateTaskListDto(formData));
  revalidatePath(PATH);
}

function formDataToCreateTaskListDto(formData: FormData) {
  return {
    name: formData.get('name') as string,
  };
}
