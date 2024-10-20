import { defineStore } from 'pinia';
import { Channel } from '../types/channel';
import { User, Status } from '../types/user';

export const useChannelStore = defineStore('channelStore', {
  state: () => ({
    channels: [
      {
        name: 'General',
        private: true,
        users: [
          { firstname: 'John', lastname: 'Doe', username: 'johndoe', role: 'admin', status: Status.ONLINE } as User,
          { firstname: 'Jane', lastname: 'Smith', username: 'janesmith', role: 'member', status: Status.OFFLINE } as User,
        ],
      },
      {
        name: 'Development',
        private: false,
        users: [
          { firstname: 'Alice', lastname: 'Johnson', username: 'alicej', role: 'developer', status: Status.DND } as User,
        ],
      },
      {
        name: 'Design',
        private: false,
        users: [
          { firstname: 'Bob', lastname: 'Brown', username: 'bobb', role: 'designer', status: Status.INVISIBLE } as User,
        ],
      },
      {
        name: 'Marketing',
        private: false,
        users: [
          { firstname: 'Eve', lastname: 'White', username: 'evew', role: 'marketer', status: Status.ONLINE } as User,
        ],
      },
    ] as Channel[],
    selectedChannel: null as Channel | null,
  }),
  actions: {
    selectChannel(channel: Channel) {
      this.selectedChannel = channel;
    },
    addNewChannel(newChannel: Channel) {
      this.channels.push(newChannel);
    },
    getSelectedChannel() {
      return this.selectedChannel;
    },
    removeChannel(channelName: string) {
      const index = this.channels.findIndex((channel) => channel.name === channelName);
      this.channels.splice(index, 1);
    },
  },
});
