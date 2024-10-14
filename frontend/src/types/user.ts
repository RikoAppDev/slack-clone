export interface User {
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  status: Status;
}

export enum Status {
  OFFLINE = 'Offline',
  ONLINE = 'Online',
  DND = 'Do Not Disturb',
  INVISIBLE = 'Invisible',
}
