import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { Cookies } from 'quasar';
import { authService } from '../services/authService';
import { Status, User } from '../types/user';
import {
  LoginCredentialsDao,
  LoginResponseDao,
  SignupDataDao,
  // UserDao,
} from '../types/auth'; // Service file for backend communication

export const useUserStore = defineStore('user', () => {
  // State: Authentication and user details
  const token = ref<string | null>(Cookies.get('authToken') || null);
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  const status = ref<Status>(
    (localStorage.getItem('status') as Status) || null
  );

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const getFullName = computed(() =>
    user.value ? `${user.value.firstname} ${user.value.lastname}` : ''
  );
  const getUsername = computed(() => '@' + user.value?.username);
  const getStatus = computed(() => status.value);

  // Actions
  // Signup action: Handles user signup and token storage in cookies
  const signup = async (signupData: SignupDataDao) => {
    const data: LoginResponseDao = await authService.signup(signupData);

    token.value = data.token;
    status.value = Status.ONLINE;
    user.value = {
      ...data.user,
      status: status.value,
    };

    Cookies.set('authToken', data.token, {
      secure: true,
      sameSite: 'Strict',
    });

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('status', status.value);
  };

  // Login action: Handles user login and token storage in cookies
  const login = async (credentials: LoginCredentialsDao) => {
    const data: LoginResponseDao = await authService.login(credentials);

    token.value = data.token;
    //TODO: Handle status (adjust based on API response structure)
    status.value = Status.ONLINE;
    user.value = {
      ...data.user,
      status: status.value,
    };

    Cookies.set('authToken', data.token, {
      secure: true,
      sameSite: 'Strict',
    });

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('status', status.value);
  };

  // Logout action: Clears user data and removes token
  const logout = async () => {
    await authService.logout(token.value);

    token.value = null;
    user.value = null;

    Cookies.remove('authToken');
    localStorage.clear();
  };

  // TODO: Check authentication: Checks for persisted token and user on page load
  const checkAuth = async () => {
    const savedToken = Cookies.get('authToken');

    if (savedToken) {
      try {
        // Optionally, verify token validity with the backend in the future
        const data = await authService.me(savedToken);

        token.value = savedToken;
        user.value = data.user;
        status.value = Status.ONLINE; // Update user status based on authentication
      } catch (error) {
        console.error('Token verification failed:', error);
        await logout(); // If token is invalid, clear session
      }
    } else {
      await logout();
    }
  };

  // Change user status (e.g., online, dnd, invisible, offline)
  const changeStatus = (newStatus: Status) => {
    status.value = newStatus;

    localStorage.setItem('status', newStatus);
    // Optionally, send the status update to the backend if needed
    // authService.updateStatus(newStatus);
  };

  return {
    // State and Getters
    token,
    user,
    status,
    isAuthenticated,
    getFullName,
    getUsername,
    getStatus,

    // Actions
    signup,
    login,
    logout,
    checkAuth,
    changeStatus,
  };
});
