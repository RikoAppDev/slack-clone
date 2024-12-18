import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { Cookies } from 'quasar';
import { authService } from '../services/authService';
import { statusService } from '../services/statusService';
import { User } from '../types/user';
import { useMessageStore } from './messageStore';
import { UserStatus } from '../types/enum';
import {
  LoginCredentialsDao,
  LoginResponseDao,
  SignupDataDao,
  // UserDao,
} from '../types/auth'; // Service file for backend communication
import { wsService } from '../services/wsService';

export const useUserStore = defineStore('user', () => {
  // State: Authentication and user details
  const token = ref<string | null>(Cookies.get('authToken') || null);
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const getFullName = computed(() =>
    user.value ? `${user.value.firstname} ${user.value.lastname}` : ''
  );
  const getUsername = computed(() => user.value?.username);
  const getStatus = computed(() => user.value?.status);

  // Actions
  // Signup action: Handles user signup and token storage in cookies
  const signup = async (signupData: SignupDataDao) => {
    const data: LoginResponseDao = await authService.signup(signupData);

    token.value = data.token;
    user.value = {
      ...data.user,
    };

    Cookies.set('authToken', data.token, {
      secure: true,
      sameSite: 'Strict',
    });

    localStorage.setItem('user', JSON.stringify(data.user));
    wsService.updateStatus(user.value!);
  };

  // Login action: Handles user login and token storage in cookies
  const login = async (credentials: LoginCredentialsDao) => {
    const data: LoginResponseDao = await authService.login(credentials);

    token.value = data.token;
    user.value = {
      ...data.user,
    };

    Cookies.set('authToken', data.token, {
      secure: true,
      sameSite: 'Strict',
    });

    localStorage.setItem('user', JSON.stringify(data.user));
    wsService.updateStatus(user.value!);
  };

  // Logout action: Clears user data and removes token
  const logout = async (request: boolean) => {
    if (request) {
      await authService.logout();
      user.value!.status = UserStatus.OFFLINE;
      wsService.updateStatus(user.value!);
    }

    token.value = null;
    user.value = null;

    // Clear cookies and local storage and data storage
    Cookies.remove('authToken');
    localStorage.clear();
  };

  const checkAuth = async () => {
    const savedToken = Cookies.get('authToken');

    if (savedToken) {
      try {
        await authService.me();

        // token.value = savedToken;
        // user.value = data.user;
        // status.value = Status.ONLINE; // Update user status based on authentication
      } catch (error) {
        console.error('Token verification failed:', error);
        await logout(false); // If token is invalid, clear session
      }
    } else {
      await logout(false);
    }
  };

  const changeStatus = async (newStatus: UserStatus) => {
    try {
      const oldStatus = user.value?.status;
      const data = await statusService.updateStatus(newStatus);
  
      user.value!.status = data.status;
      localStorage.setItem('user', JSON.stringify(user.value));
  
      // Handle message reception based on status change
      const messageStore = useMessageStore();
      await messageStore.handleStatusChange(oldStatus!, newStatus);
  
      // Emit status change event
      wsService.updateStatus(user.value!);
  
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return {
    // State and Getters
    token,
    user,
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
