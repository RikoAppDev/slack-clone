import { defineStore } from 'pinia';
import { ref } from 'vue';
import { date } from 'quasar';

export const useMessageStore = defineStore('messageStore', () => {
  const messages = ref([
    { text: 'Hello!', name: 'User 1', timestamp: date.formatDate(new Date(), 'HH:mm') },
    { text: 'Hi there!', name: 'User 2', timestamp: date.formatDate(new Date(), 'HH:mm') },
    { text: 'How are you?', name: 'User 3', timestamp: date.formatDate(new Date(), 'HH:mm') },
  ]);

  const addMessage = (message: string) => {
    messages.value.push({
      text: message,
      name: 'You',
      timestamp: date.formatDate(new Date(), 'HH:mm'),
    });
  };

  return { messages, addMessage };
});
