import { User } from './user';

export interface Channel {
  name: string;
  private: boolean;
  users?: User[];
}
