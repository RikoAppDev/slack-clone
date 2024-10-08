import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChannelStore = defineStore('channelStore', () => {
  const channels = ref([
    { name: 'General', imgUrl: 'https://picsum.photos/100?random=1', link: '/', private: true },
    { name: 'Development', imgUrl: 'https://picsum.photos/100?random=2', link: '/', private: false },
    { name: 'Design', imgUrl: 'https://picsum.photos/100?random=3', link: '/', private: false },
    { name: 'Marketing', imgUrl: 'https://picsum.photos/100?random=4', link: '/', private: false },
  ]);

  const selectedChannel = ref(channels.value[0]);

  const selectChannel = (channel: typeof channels.value[0]) => {
    selectedChannel.value = channel;
  };

  return { channels, selectedChannel, selectChannel };
});
