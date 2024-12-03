import { defineStore } from 'pinia';
import { Channel } from '../types/channel';
import { channelService } from '../services/channelService';
import { inviteService } from '../services/inviteService';
import { wsService } from '../services/wsService';
import { kickService } from '../services/kickService';
import { useMessageStore } from './messageStore';
import { useUserStore } from './user';
import { User } from '../types/user';

export const useChannelStore = defineStore('channelStore', {
  state: () => ({
    invitations: [] as Channel[],
    channels: [] as Channel[],
    selectedChannel: null as Channel | null,
    users: [] as User[],
    showUserList: JSON.parse(localStorage.getItem('userList') || 'true'),
  }),
  actions: {
    async fetchChannels() {
      const data = await channelService.fetchChannels();
      this.channels = data.channels;
      console.log(this.channels);
      this.invitations = this.channels.filter((c) => c.isInvitation == true);
      this.channels = this.channels.filter((c) => c.isInvitation == false);

      const messageStore = useMessageStore();
      this.channels.forEach((channel) => {
        if (!messageStore.messages[channel.name]) {
          const messageStore = useMessageStore();
          messageStore.messages[channel.name] = [];
          messageStore.currentPage[channel.name] = 1;
        }
      });

      await this.initializeSelectedChannel();
    },

    selectChannel(channel: Channel) {
      if (this.selectedChannel?.name !== channel.name) {
        this.selectedChannel = channel;
        const messageStore = useMessageStore();
        messageStore.messages[channel.name] = [];
        messageStore.currentPage[channel.name] = 1;
        wsService.joinChannel(channel.name);
      }
    },

    async addNewChannel(newChannel: Channel, isJoin = false) {
      const data = await channelService.addNewChannel(newChannel, isJoin);

      this.channels.push(data.channel);

      this.selectChannel(this.channels[this.channels.length - 1]);
      const userStore = useUserStore();
      const user = userStore.user as User;

      if (!user) {
        throw new Error('User not found');
      }
      wsService.joinChannel(newChannel.name);
      wsService.updateUser(newChannel, user, true);
    },

    async invite(newChannel: string, username: string) {
      await inviteService.invite(newChannel, username);

      const channel = this.channels.find((c) => c.name === newChannel);

      if (!channel) {
        throw new Error('Channel not found');
      }

      wsService.invite(channel, username);
    },

    async revoke(channelName: string, username: string) {
      await inviteService.revoke(channelName, username);
      
      const channel = this.channels.find((c) => c.name === channelName);
      const user = this.selectedChannel?.users?.find((u: User) => u.username === username);

      wsService.kickUser(channelName, username);
      wsService.updateUser(channel as Channel, user as User, false);
    },

    getSelectedChannel() {
      return this.selectedChannel;
    },

    async removeChannel(channelName: string) {
      await channelService.removeChannel(channelName);
      wsService.deleteChannel(channelName);

      this.channels = this.channels.filter(
        (channel) => channel.name !== channelName
      );
      if (this.selectedChannel?.name === channelName) {
        this.selectedChannel =
          this.channels.length > 0 ? this.channels[0] : null;
      }
    },

    async quitChannel(channelName: string) {
      const channel = this.channels.find((c) => c.name === channelName);
      
      await channelService.quitChannel(channelName);
      this.channels = this.channels.filter(
        (channel) => channel.name !== channelName
      );
      if (this.selectedChannel?.name === channelName) {
        this.selectedChannel =
          this.channels.length > 0 ? this.channels[0] : null;
      }
      
      if (!channel) {
        throw new Error('Channel not found');
      }

      wsService.updateUser(channel, useUserStore().user as User, false);
    },

    async initializeSelectedChannel() {
      this.selectedChannel = this.channels.length > 0 ? this.channels[0] : null;
      if (this.selectedChannel) {
        const messageStore = useMessageStore();
        await messageStore.fetchMessagesForChannel(
          this.selectedChannel.name as string,
          1
        );
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

      const userStore = useUserStore();
      const user = userStore.user as User;

      if (!user) {
        throw new Error('User not found');
      }

      wsService.updateUser(data.channel, user, true);
    },

    async rejectInvitation(name: string) {
      await inviteService.rejectInvite(name);

      this.invitations = this.invitations.filter(
        (channel) => channel.name !== name
      );
    },

    async kickUser(newChannel: string, username: string) {
      const data = await kickService.kickUser(newChannel, username);
      
      const user = this.selectedChannel?.users?.find((u: User) => u.username === username);
      const channel = this.channels.find((c) => c.name === newChannel);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      if (!channel) {
        throw new Error('Channel not found');
      }
      
      if (data.banned) {
        wsService.kickUser(newChannel, username);
        wsService.updateUser(channel, user, false);
      }
      return data;
    },

    handleUserList() {
      this.showUserList = !this.showUserList;
      localStorage.setItem('userList', JSON.stringify(this.showUserList));
    },
  },
});
