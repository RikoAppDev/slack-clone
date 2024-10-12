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

  const fetchMessagesForChannel = (channelName: string, page: number) => {
    const start = (page - 1) * pageSize;
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
    messages.value = allMessages.slice(start, end);
    return messages.value;
  };

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
