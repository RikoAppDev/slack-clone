import { api } from './remoteService';
import { useChannelStore } from '../stores/channelStore';

export const messService = {
  async fetchMessagesForChannel(channelName: string, page: number, pageSize: number) {
    const response = await api('GET', `/channels/${channelName}/messages/retrieve`, { 'page': page, 'pageSize': pageSize });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    return data;
  },

  async addMessage(content: string) {
    const channelStore = useChannelStore();
    const channelName = channelStore.getSelectedChannel()?.name;

    if (!channelName) {
      throw new Error('No channel selected');
    }

    const response = await api('POST', `/channels/${channelName}/messages/create`, { content });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to add message');
    }

    return data;
  },
};
