import { User } from '@/services/users/User';

export const fakeUsers: Record<string, User> = {
  ['zenek@zenon.zn']: {
    id: 'zenek',
    name: 'Zenon Zenek',
    email: 'zenek@zenon.zn',
    password: 'zenek123',
    createdAt: 1698315577922,
    updatedAt: 1698315577922,
  },
};
