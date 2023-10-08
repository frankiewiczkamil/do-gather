import { redirect } from 'next/navigation';
import { PATH } from '@/app/todo-lists/common';
import { addTodoLists } from '@/services/todo-lists/todoListService';

export async function create(formData: FormData) {
  'use server';
  addTodoLists(formDataToCreateTodoListDto(formData));
  redirect(PATH);
}

function formDataToCreateTodoListDto(formData: FormData) {
  return {
    name: formData.get('name') as string,
  };
}
