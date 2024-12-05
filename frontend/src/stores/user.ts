import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { Cookies } from 'quasar';
import { authService } from '../services/authService';
import { User } from '../types/user';
import { UserStatus } from '../types/enum';
import {
  LoginCredentialsDao,
  LoginResponseDao,
  SignupDataDao,
  // UserDao,
} from '../types/auth'; // Service file for backend communication
import { useMessageStore } from './messageStore';
import { useChannelStore } from './channelStore';

export const useUserStore = defineStore('user', () => {
  // State: Authentication and user details
  const token = ref<string | null>(Cookies.get('authToken') || null);
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  const status = ref<UserStatus>(
    (localStorage.getItem('status') as UserStatus) || null
  );

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const getFullName = computed(() =>
    user.value ? `${user.value.firstname} ${user.value.lastname}` : ''
  );
  const getUsername = computed(() => user.value?.username);
  const getStatus = computed(() => status.value);

  // Actions
  // Signup action: Handles user signup and token storage in cookies
  const signup = async (signupData: SignupDataDao) => {
    const data: LoginResponseDao = await authService.signup(signupData);

    token.value = data.token;
    status.value = UserStatus.ONLINE;
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
    status.value = UserStatus.ONLINE;
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
  const logout = async (request: boolean) => {
    if (request) {
      await authService.logout();
    }

    token.value = null;
    user.value = null;

    // Clear cookies and local storage and data storage
    Cookies.remove('authToken');
    localStorage.clear();
    const messageStore = useMessageStore();
    const channelStore = useChannelStore();

    messageStore.messages = {};
    channelStore.channels = [];
    channelStore.invitations = [];
    channelStore.users = [];
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

  // Change user status (e.g., online, dnd, invisible, offline)
  const changeStatus = (newStatus: UserStatus) => {
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
