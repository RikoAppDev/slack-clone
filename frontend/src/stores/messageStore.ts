import { defineStore } from 'pinia';
import { Message } from '../types/message';
import { messService } from '../services/messService';
import { wsService } from '../services/wsService';
import { useChannelStore } from './channelStore';
import { watch } from 'vue';

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

      this.messages[channelName] = [...this.messages[channelName], ...data.data]
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
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

const channelStore = useChannelStore();

watch(
  () => channelStore.selectedChannel,
  (newChannel) => {
    if (newChannel) {
      const channelName = newChannel.name;
      const messageStore = useMessageStore();
      messageStore.messages[channelName] = [];
      messageStore.currentPage[channelName] = 1;
    }
  }
);

wsService.onMessage( (message, username) => {
  const channelName = useChannelStore().getSelectedChannel()?.name;

  if (channelName) {
    const messageStore = useMessageStore();
    if (!messageStore.messages[channelName]) {
      messageStore.messages[channelName] = [];
    }

    const newMessage = {
      text: message,
      name: username,
      timestamp: new Date().toISOString(),
      channelName,
    }

    messageStore.messages[channelName].push(newMessage);
  }
});
