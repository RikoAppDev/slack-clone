import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChannelStore = defineStore('channelStore', () => {
  const channels = ref([
    { name: 'General', link: '/', private: true },
    { name: 'Development', link: '/', private: false },
    { name: 'Design', link: '/', private: false },
    { name: 'Marketing', link: '/', private: false },
  ]);

  const selectedChannel = ref(channels.value[0]);

  const selectChannel = (channel: typeof channels.value[0]) => {
    selectedChannel.value = channel;
  };

  return { channels, selectedChannel, selectChannel };
});
