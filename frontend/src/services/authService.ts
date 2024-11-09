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

  async me(token: string | null) {
    const response = await fetch(process.env.API_URL + '/auth/me', {
      method: 'GET',
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

  async logout(token: string | null) {
    const response = await fetch(process.env.API_URL + '/auth/logout', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Logout failed');
    }

    return data;
  },
};
