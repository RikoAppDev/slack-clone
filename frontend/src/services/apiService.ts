import { User } from 'app/frontend/src/types/user';

// TODO: example of future endpoint calls

export const apiService = {
  // Future API call for signup
  async signup(signupData: {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
  }) {
    // Simulate or make an actual API request
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(signupData),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    return data;
  },

  // Future API call for login
  async login(credentials: { email: string; password: string }) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data; // Should return token and user data
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
