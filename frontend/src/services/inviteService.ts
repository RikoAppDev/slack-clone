import { api } from './remoteService';

export const inviteService = {
  async invite(channelName: string, username: string) {
    const response = await api('POST', '/invite/new', {
      channelName,
      username,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to sent invite');
    }

    return data;
  },

  async revoke(channelName: string, username: string) {
    const response = await api('DELETE', '/invite/revoke', {
      channelName,
      username,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to revoke user');
    }

    return data;
  },

  async acceptInvite(channelName: string) {
    const response = await api('PUT', '/invite/accept', { channelName });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to accept invite');
    }

    return data;
  },

  async rejectInvite(channelName: string) {
    const response = await api('DELETE', '/invite/reject', { channelName });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to reject invite');
    }

    return data;
  },
};
