import { UserStatus } from './enum';

export interface User {
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  status: UserStatus;
}
