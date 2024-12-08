import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { NotificationSettings } from '../types/notificationSettings';

export const useAppPreferencesStore = defineStore('appPreferences', () => {
  const leftDrawerOpen = ref<boolean>(
    JSON.parse(localStorage.getItem('leftDrawerOpen') || 'true')
  );

  const notificationPermission = ref<NotificationPermission>(
    Notification.permission
  );

  const userNotificationSettings = ref<NotificationSettings>({
    notifyOnlyMentions: true,
  });

  const toggleLeftDrawer = (): void => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };

  watch(leftDrawerOpen, () => {
    localStorage.setItem(
      'leftDrawerOpen',
      JSON.stringify(leftDrawerOpen.value)
    );
  });

  const setNotificationPermission = (
    permission: NotificationPermission
  ): void => {
    notificationPermission.value = permission;
  };

  const getUserNotificationSettings = (): NotificationSettings => {
    return userNotificationSettings.value;
  };

  const setUserNotificationSettings = (
    settings: NotificationSettings
  ): void => {
    userNotificationSettings.value = settings;
  };

  return {
    leftDrawerOpen,
    toggleLeftDrawer,
    notificationPermission,
    userNotificationSettings,
    setNotificationPermission,
    getUserNotificationSettings,
    setUserNotificationSettings,
  };
});
