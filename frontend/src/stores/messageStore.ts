import { defineStore } from 'pinia';
import { Message } from 'app/frontend/src/types/message';

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: {} as { [key: string]: Message[] },
    pageSize: 15,
    currentPage: 1,
  }),
  actions: {
    async fetchMessagesForChannel(channelName: string, page: number): Promise<Message[]> {
      try {
        const response = await fetch(`/api/channels/${channelName}/messages/retrieve?page=${page}&pageSize=${this.pageSize}`);
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        return [];
      }
    },
    async addMessage(message: Message) {
      try {
        const response = await fetch(`/api/channels/${message.channelName}/messages/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: message.text }),
        });

        const data = await response.json();
        if (!this.messages[message.channelName]) {
          this.messages[message.channelName] = [];
        }
        this.messages[message.channelName].push(data.data);

      } catch (error) {
        console.error('Failed to add message to the database:', error);
      }
    },
  },
});
