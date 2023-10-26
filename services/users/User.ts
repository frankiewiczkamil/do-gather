export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
};

export type RegisterUserDto = {
  name: string;
  email: string;
  password: string;
};
export type LoginUserDto = {
  email: string;
  password: string;
};
