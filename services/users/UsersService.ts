import { LoginUserDto, RegisterUserDto, User } from '@/services/users/User';
import { randomUUID } from 'crypto';
import { fakeUsers } from '@/services/users/fakeUsers';

const users: Record<string, User> = fakeUsers;
export function registerUser(userDto: RegisterUserDto) {
  if (users[userDto.email]) throw new Error('User already exists');
  users[userDto.email] = { ...userDto, id: randomUUID(), createdAt: Date.now(), updatedAt: Date.now() };
  console.log('users', users);
}

export function loginUser(credentials: LoginUserDto) {
  const user = users[credentials.email];
  if (!user) throw new Error('User not found');
  if (user.password !== credentials.password) throw new Error('Invalid password');
  return user;
}
