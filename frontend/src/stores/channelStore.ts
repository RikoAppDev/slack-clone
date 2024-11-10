import { defineStore } from 'pinia';
import { Channel } from '../types/channel';
import { channelService } from '../services/channelService';

export const useChannelStore = defineStore('channelStore', {
  state: () => ({
    channels: [] as Channel[],
    selectedChannel: null as Channel | null,
  }),
  actions: {
    async fetchChannels() {
      const data = await channelService.fetchChannels();

      this.channels = data.channels;
      this.initializeSelectedChannel();
    },
    selectChannel(channel: Channel) {
      this.selectedChannel = channel;
    },
    async addNewChannel(newChannel: Channel) {
      const data = await channelService.addNewChannel(newChannel);

      this.channels.push(data.channel);
    },
    getSelectedChannel() {
      return this.selectedChannel;
    },
    async removeChannel(channelName: string) {
      await channelService.removeChannel(channelName);

      this.channels = this.channels.filter(
        (channel) => channel.name !== channelName
      );
      if (this.selectedChannel?.name === channelName) {
        this.selectedChannel =
          this.channels.length > 0 ? this.channels[0] : null;
      }
    },
    initializeSelectedChannel() {
      this.selectedChannel = this.channels.length > 0 ? this.channels[0] : null;
    },
  },
});
