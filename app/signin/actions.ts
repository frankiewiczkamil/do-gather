import { LoginUserDto } from '@/services/users/User';
import { loginUser } from '@/services/users/UsersService';
import { redirect } from 'next/navigation';

export async function signIn(formData: FormData) {
  'use server';
  const loginUserDto = formDataToRegisterDto(formData);
  loginUser(loginUserDto);
  redirect('/');
}

function formDataToRegisterDto(formData: FormData): LoginUserDto {
  return {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
}
