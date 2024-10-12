export interface User {
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  status: Status;
}

export enum Status {
  OFFLINE,
  ONLINE,
  DND,
  INVISIBLE,
}
