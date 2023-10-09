import { redirect } from 'next/navigation';
import { PATH } from '@/app/task-lists/common';
import { addTaskList } from '@/services/lists/TaskListService';

export async function create(formData: FormData) {
  'use server';
  addTaskList(formDataToCreateTaskListDto(formData));
  redirect(PATH);
}

function formDataToCreateTaskListDto(formData: FormData) {
  return {
    name: formData.get('name') as string,
  };
}
