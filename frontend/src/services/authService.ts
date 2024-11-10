import {
  LoginCredentialsDao,
  SignupDataDao,
} from 'app/frontend/src/types/auth';
import { api } from './remoteService';

export const authService = {
  async signup(signupData: SignupDataDao) {
    const response = await api('POST', '/auth/register', signupData);

    const data = await response.json();

    // Bad request or Conflict
    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    return data;
  },

  async login(credentials: LoginCredentialsDao) {
    const response = await api('POST', '/auth/login', credentials);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  },

  async me() {
    const response = await api('GET', '/auth/me', {});

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return data;
  },

  async logout() {
    const response = await api('DELETE', '/auth/logout', {});

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Logout failed');
    }

    return data;
  },
};
