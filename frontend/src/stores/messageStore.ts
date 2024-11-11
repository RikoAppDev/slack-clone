import { defineStore } from 'pinia';
import { Message } from '../types/message';
import { messService } from '../services/messService';
import { useChannelStore } from './channelStore';

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: {} as { [key: string]: Message[] },
    pageSize: 15,
    currentPage: {} as { [key: string]: number },
    hasMoreMessages: {} as { [key: string]: boolean },
  }),
  actions: {
    async fetchMessagesForChannel(channelName: string, page: number) {
      const data = await messService.fetchMessagesForChannel(channelName, page, this.pageSize);

      const channelStore = useChannelStore();

      if (channelStore.selectedChannel && channelName === channelStore.selectedChannel.name) {
        this.messages[channelName] = [];
        this.currentPage[channelName] = 1;
      }

      // Sedliacky fix
      this.messages[channelName] = [...this.messages[channelName], ...data.data]
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      this.hasMoreMessages[channelName] = data.data.length === this.pageSize;
      },

    async addMessage(message: Message) {
      const content = message.text;
      const data = await messService.addMessage(content);

      const channelName = useChannelStore().getSelectedChannel()?.name;

      if (!channelName) {
        throw new Error('No channel selected');
      }

      if (!this.messages[channelName]) {
        this.messages[channelName] = [];
      }

      this.messages[channelName].push(data.data);
    },
  },
});
