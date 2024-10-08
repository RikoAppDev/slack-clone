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

  const fetchMessagesForChannel = (channelName: string) => {
    clearMessages();
    messages.value = [
      { text: `Welcome to ${channelName}!`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
      { text: `This is the ${channelName} channel.`, name: 'System', timestamp: date.formatDate(new Date(), 'HH:mm') },
    ];
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
