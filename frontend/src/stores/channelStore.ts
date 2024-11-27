import { defineStore } from 'pinia';
import { Channel } from '../types/channel';
import { channelService } from '../services/channelService';
import { inviteService } from '../services/inviteService';
import { wsService } from '../services/wsService';

export const useChannelStore = defineStore('channelStore', {
  state: () => ({
    invitations: [] as Channel[],
    channels: [] as Channel[],
    selectedChannel: null as Channel | null,
    users: [] as string[],
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
      wsService.joinChannel(channel.name);
    },

    async addNewChannel(newChannel: Channel, isJoin = false) {
      const data = await channelService.addNewChannel(newChannel, isJoin);

      this.channels.push(data.channel);

      this.selectChannel(this.channels[this.channels.length - 1]);
    },

    async invite(newChannel: string, username: string) {
      await inviteService.invite(newChannel, username);
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

    async quitChannel(channelName: string) {
      await channelService.quitChannel(channelName);

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
      if (this.selectedChannel) {
        wsService.joinChannel(this.selectedChannel.name);
      }
    },

    async acceptInvitation(name: any) {
      const data = await inviteService.acceptInvite(name);

      this.invitations = this.invitations.filter(
        (channel) => channel.name !== data.channel.name
      );
      this.channels.push(data.channel);

      this.selectChannel(this.channels[this.channels.length - 1]);
    },

    async rejectInvitation(name: string) {
      await inviteService.rejectInvite(name);

      this.invitations = this.invitations.filter(
        (channel) => channel.name !== name
      );
    },
  },
});
