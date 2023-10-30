import { PATH } from '@/app/task-lists/common';
import { addTaskList } from '@/services/lists/TaskListService';
import { revalidatePath } from 'next/cache';

export function createTaskListFactory(ownerId: string) {
  return async function createTaskList(formData: FormData) {
    'use server';
    const taskList = { ...formDataToCreateTaskListDto(formData), ownerId };
    addTaskList(taskList);
    revalidatePath(PATH);
  };
}

function formDataToCreateTaskListDto(formData: FormData) {
  return {
    name: formData.get('name') as string,
  };
}
