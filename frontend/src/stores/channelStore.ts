import { defineStore } from 'pinia';
import { Channel } from '../types/channel';
import { channelService } from '../services/channelService';
import { inviteService } from '../services/inviteService';

export const useChannelStore = defineStore('channelStore', {
  state: () => ({
    invitations: [] as Channel[],
    channels: [] as Channel[],
    selectedChannel: null as Channel | null,
  }),
  actions: {
    async fetchChannels() {
      const data = await channelService.fetchChannels();

      this.channels = data.channels;

      this.invitations = this.channels.filter((c) => c.isInvitation == true);
      this.channels = this.channels.filter((c) => c.isInvitation == false);
      this.initializeSelectedChannel();
    },

    selectChannel(channel: Channel) {
      this.selectedChannel = channel;
    },

    async addNewChannel(newChannel: Channel) {
      const data = await channelService.addNewChannel(newChannel);

      this.channels.push(data.channel);

      this.selectChannel(this.channels[this.channels.length - 1]);
      console.log(this.getSelectedChannel());
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

    async acceptInvitation(name: any) {
      const data = await inviteService.acceptInvite(name);

      this.invitations.reduce(data.channel);
    },

    async rejectInvitation(name: string) {
      await inviteService.rejectInvite(name);
    },
  },
});
