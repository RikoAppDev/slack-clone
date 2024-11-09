import { User } from 'app/frontend/src/types/user';

export interface AuthState {
  token: string | null;
  user: User | null;
}

export interface LoginResponseDao {
  token: string;
  user: User;
}

export interface LoginCredentialsDao {
  email: string;
  password: string;
}

export interface SignupDataDao {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}
