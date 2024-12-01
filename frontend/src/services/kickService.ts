import { api } from './remoteService';

export const kickService = {
  async kickUser(channelName: string, username: string) {
    const response = await api('POST', '/kick', { channelName, username });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to kick user');
    }

    return data;
  },
};
