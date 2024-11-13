import { User } from './user';
import { MembershipRole } from '../types/enum';

export interface Channel {
  name: string;
  isPrivate: boolean;
  users?: User[];
  isInvitation?: boolean; // flag to indicate if this is an invitation
  role?: MembershipRole;
}
