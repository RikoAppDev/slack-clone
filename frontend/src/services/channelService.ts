import { api } from './remoteService';
import { Channel } from '../types/channel';

export const channelService = {
  async fetchChannels() {
    const response = await api('GET', '/channels/retrieve');

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch channels');
    }

    return data;
  },

  async addNewChannel(newChannel: Channel, isJoin: boolean) {
    const response = await api(
      'POST',
      `/channels/create?join=${isJoin}`,
      newChannel
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status == 409) {
        throw new Error(data.message);
      } else {
        throw new Error(
          isJoin ? 'Failed to join channel' : 'Failed to create channel'
        );
      }
    }

    return data;
  },

  async removeChannel(channelName: string) {
    const response = await api('DELETE', '/channels/delete', { channelName });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete channel');
    }

    return data;
  },

  async quitChannel(channelName: string) {
    const response = await api('DELETE', '/channels/quit', { channelName });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to quit channel');
    }

    return data;
  },
};
