import { addTask } from '@/services/todo-lists/todoListService';
import { PATH } from '@/app/todo-lists/common';
import { redirect } from 'next/navigation';

export function createAddTaskToListAction(todoListId: string) {
  return async function addTaskToListAction(formData: FormData) {
    'use server';
    const createTaskDto = formDataToCreateTodoListDto(formData);
    addTask(todoListId, createTaskDto);
    redirect(`${PATH}/${todoListId}`);
  };
}

function formDataToCreateTodoListDto(formData: FormData) {
  return {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
  };
}
