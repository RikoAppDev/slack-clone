import { api } from './remoteService';
import { Channel } from '../types/channel';

export const channelService = {
  async fetchChannels() {
    const response = await api('GET', '/channels/retrieve', {});

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch channels');
    }

    return data;
  },

  async addNewChannel(newChannel: Channel) {
    const response = await api('POST', '/channels/create', newChannel);

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to create channel');
    }

    return data;
  },

  async removeChannel(channelName: string) {
    const response = await api('DELETE', `/channels/${channelName}/delete`, {});

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to remove channel');
    }

    return data;
  },
};
