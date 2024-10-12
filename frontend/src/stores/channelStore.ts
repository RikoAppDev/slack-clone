import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Channel } from '../types/channel';

export const useChannelStore = defineStore('channelStore', () => {
  const channels = ref<Channel[]>([
    { name: 'General', private: true },
    { name: 'Development', private: false },
    { name: 'Design', private: false },
    { name: 'Marketing', private: false },
    { name: 'General', private: true },
    { name: 'Development', private: false },
    { name: 'Design', private: false },
  ]);

  const selectedChannel = ref(channels.value[0]);

  const selectChannel = (channel: (typeof channels.value)[0]) => {
    selectedChannel.value = channel;
  };

  const addNewChannel = (newChannel: Channel) => {
    channels.value.push(newChannel);
  };

  const getSelectedChannel = () => {
    return selectedChannel.value;
  };

  const removeChannel = (channelName: string) => {
    const index = channels.value.findIndex((channel) => channel.name === channelName);
    channels.value.splice(index, 1);
  }

  const getUsersInChannel = (channelName: string) => {
    const channel = channels.value.find(channel => channel.name === channelName);
    return channel ? channel.users : [];
  };

  return { channels, selectedChannel, selectChannel, removeChannel, addNewChannel, getSelectedChannel, getUsersInChannel };
});
