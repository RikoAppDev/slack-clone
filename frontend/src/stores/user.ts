import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { Cookies } from 'quasar';
import { apiService } from '../services/apiService';
import { Status, User } from '../types/user';
import {
  LoginCredentialsDao,
  // LoginResponseDao,
  SignupDataDao,
  // UserDao,
} from '../types/auth'; // Service file for backend communication

export const useUserStore = defineStore('user', () => {
  // State: Authentication and user details
  const token = ref<string | null>(Cookies.get('authToken') || null);
  const user = ref<User | null>(null);
  const status = ref<Status>(Status.OFFLINE);

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const getFullName = computed(() =>
    user.value ? `${user.value.firstname} ${user.value.lastname}` : ''
  );
  const getStatus = computed(() => status.value);

  // Actions
  // Signup action: prepares for future API interaction
  const signup = async (signupData: SignupDataDao) => {
    try {
      // TODO: handle signup
      // Simulate or replace with actual API call in the future
      // const data: UserDao = await apiService.signup(signupData);
      console.log(signupData);

      // Handle signup response (adjust with actual API response structure)
      status.value = Status.ONLINE;
      // user.value = {
      //   firstname: data.firstname,
      //   lastname: data.lastname,
      //   username: data.username,
      //   email: data.email,
      //   avatar: data.avatar,
      //   role: data.role,
      //   status: status.value,
      // };

      // Persist user information (if needed)
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  // Login action: Handles user login and token storage in cookies
  const login = async (credentials: LoginCredentialsDao) => {
    try {
      //const data: LoginResponseDao = await apiService.login(credentials);
      console.log(credentials);
      // Handle successful login (adjust based on API response structure)
      // token.value = data.token;
      // user.value = data.user;
      status.value = Status.ONLINE;

      // Store token in Cookies for persistence
      // Cookies.set('authToken', data.token, {
      //   expires: 1, // expires in 1 day
      //   secure: true,
      //   sameSite: 'Strict',
      // });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Logout action: Clears user data and removes token
  const logout = () => {
    token.value = null;
    user.value = null;
    // TODO: Status

    // Remove token from Cookies
    Cookies.remove('authToken');
  };

  // Check authentication: Checks for persisted token and user on page load
  const checkAuth = async () => {
    const savedToken = Cookies.get('authToken');

    if (savedToken) {
      try {
        // Optionally, verify token validity with the backend in the future
        const data = await apiService.getUserData(savedToken);

        token.value = savedToken;
        user.value = data.user;
        status.value = Status.ONLINE; // Update user status based on authentication
      } catch (error) {
        console.error('Token verification failed:', error);
        logout(); // If token is invalid, clear session
      }
    } else {
      logout();
    }
  };

  // Change user status (e.g., online, dnd, invisible, offline)
  const changeStatus = (newStatus: Status) => {
    status.value = newStatus;

    // Optionally, send the status update to the backend if needed
    // apiService.updateStatus(newStatus);
  };

  // Update user profile (future API integration)
  const updateProfile = async (updatedUserData: Partial<User>) => {
    try {
      const updatedUser = await apiService.updateProfile(updatedUserData);

      if (user.value) {
        user.value = { ...user.value, ...updatedUser };
      }
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  return {
    // State and Getters
    token,
    user,
    status,
    isAuthenticated,
    getFullName,
    getStatus,

    // Actions
    signup,
    login,
    logout,
    checkAuth,
    changeStatus,
    updateProfile,
  };
});
