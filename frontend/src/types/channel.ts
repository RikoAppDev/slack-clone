import { User } from './user';

export interface Channel {
  name: string;
  private: boolean;
  users?: User[];
  isInvitation?: boolean; // flag to indicate if this is an invitation
}
