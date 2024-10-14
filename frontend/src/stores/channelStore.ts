import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Channel } from '../types/channel';
import { User, Status } from '../types/user';

export const useChannelStore = defineStore('channelStore', () => {
  const channels = ref<Channel[]>([
    {
      name: 'General',
      private: true,
      users: [
        { firstname: 'John', lastname: 'Doe', username: 'johndoe', role: 'admin', status: Status.ONLINE } as User,
        { firstname: 'Jane', lastname: 'Smith', username: 'janesmith', role: 'member', status: Status.OFFLINE } as User,
        { firstname: 'Alice', lastname: 'Johnson', username: 'alicej', role: 'developer', status: Status.DND } as User,
        { firstname: 'Bob', lastname: 'Brown', username: 'bobb', role: 'designer', status: Status.INVISIBLE } as User,
        { firstname: 'Eve', lastname: 'White', username: 'evew', role: 'marketer', status: Status.ONLINE } as User,
        { firstname: 'Eric', lastname: 'Black', username: 'ericb', role: 'member', status: Status.OFFLINE } as User,
        { firstname: 'Grace', lastname: 'Green', username: 'graceg', role: 'member', status: Status.ONLINE } as User,
        { firstname: 'Henry', lastname: 'Blue', username: 'henryb', role: 'member', status: Status.DND } as User,
        { firstname: 'Ivy', lastname: 'Red', username: 'ivyr', role: 'member', status: Status.INVISIBLE } as User,
        { firstname: 'Jack', lastname: 'Purple', username: 'jackp', role: 'member', status: Status.ONLINE } as User,
        { firstname: 'Kate', lastname: 'Yellow', username: 'katey', role: 'member', status: Status.OFFLINE } as User,
        { firstname: 'Leo', lastname: 'Orange', username: 'leoo', role: 'member', status: Status.DND } as User,
        { firstname: 'Mia', lastname: 'Pink', username: 'miap', role: 'member', status: Status.INVISIBLE } as User,
        { firstname: 'Nick', lastname: 'Brown', username: 'nickb', role: 'member', status: Status.ONLINE } as User,
        { firstname: 'Olivia', lastname: 'White', username: 'oliviaw', role: 'member', status: Status.OFFLINE } as User,
        { firstname: 'Peter', lastname: 'Black', username: 'peterb', role: 'member', status: Status.DND } as User,
        { firstname: 'Queen', lastname: 'Green', username: 'queeng', role: 'member', status: Status.INVISIBLE } as User,
      ]
    },
    {
      name: 'Development',
      private: false,
      users: [
        { firstname: 'Alice', lastname: 'Johnson', username: 'alicej', role: 'developer', status: Status.DND } as User,
      ]
    },
    {
      name: 'Design',
      private: false,
      users: [
        { firstname: 'Bob', lastname: 'Brown', username: 'bobb', role: 'designer', status: Status.INVISIBLE } as User,
      ]
    },
    {
      name: 'Marketing',
      private: false,
      users: [
        { firstname: 'Eve', lastname: 'White', username: 'evew', role: 'marketer', status: Status.ONLINE } as User,
      ]
    },
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

  return { channels, selectedChannel, selectChannel, removeChannel, addNewChannel, getSelectedChannel };
});
