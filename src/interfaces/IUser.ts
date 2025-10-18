export type userType = 'admin' | 'doctors'

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: userType;
}