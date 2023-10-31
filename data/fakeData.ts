const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
export const tasks1: Task[] = [
  { id: 'elo', name: 'first task', description: lorem, status: 'in progress' },
  { id: 'ole', name: 'second task', description: lorem, status: 'new' },
];

export const tasks2: Task[] = [
  { id: 'hello', name: 'pierwsze zadanie', description: lorem, status: 'in progress' },
  { id: 'world', name: 'drugie zadanie', description: lorem, status: 'new' },
];

export const list1: TaskList = {
  id: 'list-1',
  name: 'pierwsze lista',
  tasks: tasks1,
  ownerId: 'zenek',
  users: [
    { role: 'editor', userId: 'zenek' },
    { role: 'viewer', userId: 'halinka' },
  ],
};
export const list2: TaskList = {
  id: 'list-2',
  name: 'second list',
  tasks: tasks2,
  ownerId: 'zenek',
  users: [{ role: 'editor', userId: 'zenek' }],
};
