import { RegisterUserDto } from '@/services/users/User';
import { registerUser } from '@/services/users/UsersService';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
  'use server';
  const user = formDataToRegisterDto(formData);
  registerUser(user);
  redirect('/signin');
}

function formDataToRegisterDto(formData: FormData): RegisterUserDto {
  return {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
}
