import { User } from './user';

export interface Channel {
  name: string;
  isPrivate: boolean;
  users?: User[];
  isInvitation?: boolean; // flag to indicate if this is an invitation
}
