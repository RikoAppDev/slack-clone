import { useAppPreferencesStore } from '../stores/appPreferences';
import { useUserStore } from '../stores/user';
import { UserStatus } from '../types/enum';

class NotificationService {
  static async requestPermission(): Promise<void> {
    const appPreferencesStore = useAppPreferencesStore();
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      appPreferencesStore.setNotificationPermission(permission);
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    } else {
      console.error('This browser does not support notifications.');
    }
  }

  static isPermissionGranted(): boolean {
    return Notification.permission === 'granted';
  }

  static showNotification(
    title: string,
    message: string,
    channel: string
  ): void {
    if (this.isPermissionGranted()) {
      const notification = new Notification('@' + title + ' in ' + channel, {
        body: message.length > 33 ? message.substring(0, 30) + '...' : message,
        icon: './favicon.ico',
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  }

  static handleNewMessage(message: {
    sender: string;
    content: string;
    addressedToUser: boolean;
    channel: string;
  }): void {
    const userStore = useUserStore();

    if (
      document.hidden &&
      this.isPermissionGranted() &&
      userStore.getStatus !== UserStatus.DND
    ) {
      const appPreferencesStore = useAppPreferencesStore();
      const userSettings = appPreferencesStore.getUserNotificationSettings();

      if (userSettings.notifyOnlyMentions && message.addressedToUser) {
        this.showNotification(message.sender, message.content, message.channel);
      } else if (!userSettings.notifyOnlyMentions) {
        this.showNotification(message.sender, message.content, message.channel);
      }
    }
  }
}

export default NotificationService;
