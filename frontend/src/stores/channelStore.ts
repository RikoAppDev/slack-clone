import { defineStore } from 'pinia';
import { Channel } from '../types/channel';

export const useChannelStore = defineStore('channelStore', {
  state: () => ({
    channels: [] as Channel[],
    selectedChannel: null as Channel | null,
  }),
  actions: {
    async fetchChannels() {
      try {
        const response = await fetch(`${process.env.API_URL}/api/channels/`);
        if (!response.ok) {
          throw new Error('Failed to fetch channels');
        }
        const data = await response.json();
        this.channels = data.channels;
        this.initializeSelectedChannel();
      } catch (error) {
        console.error('Failed to fetch channels:', error);
      }
    },
    selectChannel(channel: Channel) {
      this.selectedChannel = channel;
    },
    async addNewChannel(newChannel: Channel) {
      try {
        const response = await fetch(`${process.env.API_URL}/api/channels/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newChannel),
        });
        if (!response.ok) {
          throw new Error('Failed to add new channel');
        }
        const data = await response.json();
        this.channels.push(data.channel);
      } catch (error) {
        console.error('Failed to add new channel:', error);
      }
    },
    getSelectedChannel() {
      return this.selectedChannel;
    },
    async removeChannel(channelName: string) {
      try {
        const response = await fetch(`${process.env.API_URL}/api/channels/${channelName}/delete`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to remove channel');
        }
        this.channels = this.channels.filter(channel => channel.name !== channelName);
        if (this.selectedChannel?.name === channelName) {
          this.selectedChannel = this.channels.length > 0 ? this.channels[0] : null;
        }
      } catch (error) {
        console.error('Failed to remove channel:', error);
      }
    },
    initializeSelectedChannel() {
      this.selectedChannel = this.channels.length > 0 ? this.channels[0] : null;
    }
  }
});
