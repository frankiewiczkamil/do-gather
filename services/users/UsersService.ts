import { LoginUserDto, RegisterUserDto, User } from '@/services/users/User';
import { randomUUID } from 'crypto';
import { fakeUsers } from '@/services/users/fakeUsers';
import { GetUserEmailById } from '@/services/lists/TaskListPorts';

const users: Record<string, User> = fakeUsers;
export function registerUser(userDto: RegisterUserDto) {
  if (users[userDto.email]) throw new Error('User already exists');
  users[userDto.email] = { ...userDto, id: randomUUID(), createdAt: Date.now(), updatedAt: Date.now() };
  console.log('users', users);
}

export function loginUser(credentials: LoginUserDto): User | null {
  return users[credentials.email] ?? null;
}

export function getUserIdByEmail(email: string) {
  return users[email]?.id;
}

export const getUserEmailById: GetUserEmailById = (id: string) => {
  const userSlice = Object.keys(users)
    .map((key) => ({ id: users[key].id, email: key }))
    .find((u) => u.id === id);
  if (userSlice?.email) return userSlice?.email;
  else throw new Error('User not found, this should not happen');
};
