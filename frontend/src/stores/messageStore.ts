import { defineStore } from 'pinia';
import { date } from 'quasar';

interface Message {
  text: string;
  name: string;
  timestamp: string;
  channelName: string;
}

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: {} as { [key: string]: Message[] },
    pageSize: 10,
  }),
  actions: {
    async fetchMessagesForChannel(channelName: string, page: number): Promise<Message[]> {
      const start = (page - 1) * this.pageSize;
      const end = start + this.pageSize;
      const allMessages = [
        { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm'), channelName },
        { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm'), channelName },
      ];

      const newMessages = allMessages.slice(start, end);
      if (!this.messages[channelName]) {
        this.messages[channelName] = [];
      }
      this.messages[channelName] = [...newMessages, ...this.messages[channelName]];
      return this.messages[channelName];
    },
    addMessage(message: Message) {
      if (!this.messages[message.channelName]) {
        this.messages[message.channelName] = [];
      }
      this.messages[message.channelName].push(message);
    },
    clearMessages(channelName: string) {
      if (this.messages[channelName]) {
        this.messages[channelName] = [];
      }
    },
  },
});
