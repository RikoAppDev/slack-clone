import { defineStore } from 'pinia';
import { ref } from 'vue';
import { date } from 'quasar';

interface Message {
  text: string;
  name: string;
  timestamp: string;
}

export const useMessageStore = defineStore('messageStore', () => {
  const messages = ref<Message[]>([]);
  const pageSize = 10;

  async function fetchMessagesForChannel(channelName: string, page: number): Promise<Message[]> {
    const start = (page - 1) * pageSize - 5;
    const end = start + pageSize;
    const allMessages = [
      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },

    ];

    const newMessages = allMessages.slice(start, end);
    messages.value = [...newMessages, ...messages.value];
    return messages.value;
  }

  const addMessage = (message: string) => {
    messages.value.push({
      text: message,
      name: 'You',
      timestamp: date.formatDate(new Date(), 'HH:mm'),
    });
  };

  const clearMessages = () => {
    messages.value = [];
  };

  return { messages, fetchMessagesForChannel, addMessage, clearMessages };
});
