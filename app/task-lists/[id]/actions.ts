import { addTask } from '@/services/lists/TaskListService';
import { PATH } from '@/app/task-lists/common';
import { redirect } from 'next/navigation';

export function createAddTaskToListAction(taskListId: string) {
  return async function addTaskToListAction(formData: FormData) {
    'use server';
    const createTaskDto = formDataToCreateTaskListDto(formData);
    addTask(taskListId, createTaskDto);
    redirect(`${PATH}/${taskListId}`);
  };
}

function formDataToCreateTaskListDto(formData: FormData) {
  return {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
  };
}
