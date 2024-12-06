import { useChannelStore } from '../stores/channelStore';
import { defineStore } from 'pinia';
import { Message } from '../types/message';
import { messService } from '../services/messService';
import { UserStatus } from '../types/enum';

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: {} as { [key: string]: Message[] },
    pageSize: 15,
    hasMoreMessages: {} as { [key: string]: boolean },
    missedMessages: {} as { [key: string]: Message[] },
  }),
  actions: {
    async handleStatusChange(oldStatus: UserStatus, newStatus: UserStatus) {
      if (newStatus === UserStatus.OFFLINE) {
        localStorage.setItem('lastActiveChannel', useChannelStore().getSelectedChannel()?.name || '');
      }
      
      if (oldStatus === UserStatus.OFFLINE && newStatus !== UserStatus.OFFLINE) {
        const lastChannel = localStorage.getItem('lastActiveChannel');
        if (lastChannel) {
          if (this.missedMessages[lastChannel]?.length > 0) {
            this.messages[lastChannel] = [
              ...this.messages[lastChannel] || [],
              ...this.missedMessages[lastChannel]
            ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            
            this.missedMessages[lastChannel] = [];
          }
          localStorage.removeItem('lastActiveChannel');
        }
      }
    },

    async fetchMessages(channelName: string, page: number) {
      if (!this.messages[channelName]) {
        this.messages[channelName] = [];
      }

      const data = await messService.fetchMessagesForChannel(channelName, page, this.pageSize);

      // Fix for messages being duplicated
      if (page !== 1 || this.messages[channelName].length === 0) {
        this.messages[channelName] = [...this.messages[channelName], ...data.data]
          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      }
      this.hasMoreMessages[channelName] = data.data.length === this.pageSize;
      },

    async addMessage(message: Message) {
      const content = message.text;
      await messService.addMessage(content);

      const channelName = useChannelStore().getSelectedChannel()?.name;

      if (!channelName) {
        throw new Error('No channel selected');
      }

      if (!this.messages[channelName]) {
        this.messages[channelName] = [];
      }
      },
  },
});
