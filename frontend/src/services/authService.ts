import { User } from 'app/frontend/src/types/user';
import {
  LoginCredentialsDao,
  SignupDataDao,
} from 'app/frontend/src/types/auth';

export const authService = {
  async signup(signupData: SignupDataDao) {
    const response = await fetch(process.env.API_URL + '/auth/register', {
      method: 'POST',
      body: JSON.stringify(signupData),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    // Bad request or Conflict
    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    return data;
  },

  async login(credentials: LoginCredentialsDao) {
    const response = await fetch(process.env.API_URL + '/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  },

  // Future API call to get user data from a token
  async getUserData(token: string) {
    const response = await fetch('/api/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return data;
  },

  // Future API call to update profile
  async updateProfile(updatedUserData: Partial<User>) {
    const response = await fetch('/api/update-profile', {
      method: 'PATCH',
      body: JSON.stringify(updatedUserData),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Profile update failed');
    }

    return data;
  },
};
