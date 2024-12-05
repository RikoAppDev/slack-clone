import { useChannelStore } from '../stores/channelStore';
import { defineStore } from 'pinia';
import { Message } from '../types/message';
import { messService } from '../services/messService';

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: {} as { [key: string]: Message[] },
    pageSize: 15,
    hasMoreMessages: {} as { [key: string]: boolean },
  }),
  actions: {
    async fetchMessages(channelName: string, page: number) {
      if (!this.messages[channelName]) {
        this.messages[channelName] = [];
      }

      const data = await messService.fetchMessagesForChannel(channelName, page, this.pageSize);

      // Only append messages if not already loaded for page 1
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
