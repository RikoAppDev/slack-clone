import { api } from './remoteService';

export const inviteService = {
  async acceptInvite(channelName: string) {
    const response = await api('PUT', '/invite/accept', channelName);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to accept invite');
    }

    return data;
  },

  async rejectInvite(channelName: string) {
    const response = await api('DELETE', '/invite/reject', channelName);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to reject invite');
    }

    return data;
  },
};
