import { api } from './remoteService';
import { UserStatus } from '../types/enum';

export const statusService = {
  async getStatus() {
    const response = await api('GET', '/status');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch status');
    }

    return data;
  },

  async updateStatus(status: UserStatus) {
    const response = await api('PUT', '/status', { status });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update status');
    }

    return data;
  },
};
