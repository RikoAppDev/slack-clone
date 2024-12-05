<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useMessageStore } from '../stores/messageStore';
import { useChannelStore } from '../stores/channelStore';
import { useUserStore } from '../stores/user';
import { Channel } from 'app/frontend/src/types/channel';
import { wsService } from '../services/wsService';
import { date, useQuasar } from 'quasar';
import { MembershipRole, UserStatus } from '../types/enum';
import { debounce } from 'quasar';

const $q = useQuasar();

const messageStore = useMessageStore();
const channelStore = useChannelStore();
const userStore = useUserStore();
const currentChannel = ref(channelStore.getSelectedChannel());
const messageText = ref('');
const showPreview = ref(false);
const selectedUser = ref('');
const commandRegex =
  /^\/(join\s+\w+(?:\s+private)?|invite\s+\w+|revoke\s+\w+|kick\s+\w+|quit|cancel|list)$/;

watch(
  () => channelStore.getSelectedChannel(),
  (newChannel) => {
    currentChannel.value = newChannel;
  }
);

const typingMessage = computed(() => {
  return channelStore.typingUsers[selectedUser.value]?.text || '';
});

const showTypingMessage = (username: string) => {
  selectedUser.value = username;
  showPreview.value = true;
};

watch(
  () => channelStore.typingUsers[selectedUser.value],
  (newValue) => {
    if (!newValue) {
      showPreview.value = false;
      selectedUser.value = '';
    }
  }
);

const debouncedWsUpdate = debounce((text: string) => {
  if (currentChannel.value) {
    wsService.type(currentChannel.value.name, text);
  }
}, 100);

watch(messageText, (newText) => {
  const decodedMessage = decodeHTMLEntities(newText);
  const trimmedMessage = decodedMessage.trim().replace(/<br\s*\/?>$/gi, '');
  debouncedWsUpdate(trimmedMessage);
});

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
};

const decodeHTMLEntities = (text: string) => {
  const element = document.createElement('textarea');
  element.innerHTML = text;
  return element.value;
};

const handleCommand = async (command: string) => {
  const match = command.match(commandRegex);
  if (!match) return;
  const parts = match[1].split(/\s+/);
  if (parts[0] === 'join') {
    const channelName = parts[1];
    const isPrivate = parts[2] === 'private';
    const existingChannel = channelStore.channels.find(
      (channel) => channel.name === channelName
    );
    if (!existingChannel) {
      const newChannel: Channel = {
        name: channelName,
        isPrivate: isPrivate,
      };

      try {
        await channelStore.addNewChannel(newChannel, true);

        $q.notify({
          type: 'positive',
          message: 'Channel joined successfully',
          position: 'top',
        });
      } catch (error: any) {
        $q.notify({
          type: 'negative',
          message: error.message || 'Failed to add new channel',
          position: 'top',
        });
      }
    } else {
      channelStore.selectChannel(existingChannel);

      $q.notify({
        type: 'positive',
        message: 'Already in the channel',
        position: 'top',
      });
    }
  } else if (parts[0] === 'list') {
    if (currentChannel.value) {
      channelStore.handleUserList();
    }
  } else if (parts[0] === 'invite') {
    const channelName = currentChannel.value?.name as string;
    const username = parts[1];

    if (
      currentChannel.value?.isPrivate &&
      currentChannel.value.role == MembershipRole.MEMBER
    ) {
      $q.notify({
        type: 'negative',
        message: 'Only ADMIN can sent an invitation to private channel',
        position: 'top',
      });
      return;
    }

    try {
      await channelStore.invite(channelName, username);

      $q.notify({
        type: 'positive',
        message: `Invitation into ${channelName} channel sent to @${username}`,
        position: 'top',
      });
    } catch (error: any) {
      $q.notify({
        type: 'negative',
        message: error.message || 'Failed to sent invite',
        position: 'top',
      });
    }
  } else if (
    parts[0] === 'revoke' &&
    currentChannel.value?.isPrivate &&
    currentChannel.value?.role == MembershipRole.ADMIN
  ) {
    const channelName = currentChannel.value?.name as string;
    const username = parts[1];

    if (username == userStore.getUsername) {
      return;
    }

    try {
      await channelStore.revoke(channelName, username);

      $q.notify({
        type: 'positive',
        message: `User @${username} was removed from ${channelName} channel`,
        position: 'top',
      });
    } catch (error: any) {
      $q.notify({
        type: 'negative',
        message: error.message || 'Failed to revoke invite',
        position: 'top',
      });
    }
  } else if (
    parts[0] === 'quit' &&
    currentChannel.value?.role == MembershipRole.ADMIN
  ) {
    if (currentChannel.value) {
      try {
        await channelStore.removeChannel(currentChannel.value.name);

        if (channelStore.channels.length > 0) {
          channelStore.selectChannel(channelStore.channels[0]);
        } else {
          currentChannel.value = null;
        }

        $q.notify({
          type: 'positive',
          position: 'top',
          message: 'Channel deleted successfully',
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Failed to remove channel',
          position: 'top',
        });
      }
    }
  } else if (parts[0] === 'cancel') {
    if (currentChannel.value) {
      const channelRole = currentChannel.value.role;

      try {
        if (channelRole === MembershipRole.ADMIN) {
          await channelStore.removeChannel(currentChannel.value.name);
        } else {
          await channelStore.quitChannel(currentChannel.value.name);
        }

        if (channelStore.channels.length > 0) {
          channelStore.selectChannel(channelStore.channels[0]);
        } else {
          currentChannel.value = null;
        }

        $q.notify({
          type: 'positive',
          position: 'top',
          message:
            channelRole === MembershipRole.ADMIN
              ? 'Channel deleted successfully'
              : 'Channel left successfully',
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message:
            currentChannel.value?.role == MembershipRole.ADMIN
              ? 'Failed to remove channel'
              : 'Failed to leave channel',
          position: 'top',
        });
      }
    }
  } else if (parts[0] === 'kick' && !currentChannel.value?.isPrivate) {
    const channelName = currentChannel.value?.name as string;
    const username = parts[1];

    try {
      const data = await channelStore.kickUser(channelName, username);

      $q.notify({
        type: 'positive',
        message: data.banned
          ? `User @${username} was banned from ${channelName} channel.`
          : `User @${username} was kicked from ${channelName} channel. Kick count until ban: ${
              3 - data.kickCount
            }`,
        position: 'top',
      });
    } catch (error: any) {
      $q.notify({
        type: 'negative',
        message: error.message || 'Failed to kick user',
        position: 'top',
      });
    }
  }
};

const sendMessage = () => {
  const decodedMessage = decodeHTMLEntities(messageText.value);
  const trimmedMessage = decodedMessage.trim().replace(/<br\s*\/?>$/gi, '');
  if (trimmedMessage !== '') {
    if (commandRegex.test(trimmedMessage)) {
      handleCommand(trimmedMessage);
    } else if (currentChannel.value) {
      wsService.sendMessage(currentChannel.value!.name, trimmedMessage);
      const message = {
        text: trimmedMessage,
        name: wsService.username,
        timestamp: date.formatDate(new Date()),
        channelName: currentChannel.value!.name,
      };
      messageStore.addMessage(message);
    }
    messageText.value = '';
  }
};

const returnStatus = (userStatus: UserStatus) => {
  switch (userStatus) {
    case UserStatus.ONLINE:
      return '🟢 Online';
    case UserStatus.DND:
      return '⛔ Do Not Disturb';
    default:
      return '😴 Offline';
  }
};
</script>

<template>
  <div
    v-if="Object.keys(channelStore.typingUsers).length > 0"
    class="typing-indicators q-px-md"
  >
    <div
      v-for="username in Object.keys(channelStore.typingUsers)"
      :key="username"
      class="typing-user"
    >
      <q-chip
        clickable
        @click="showTypingMessage(username)"
        color="grey-3"
        text-color="primary"
      >
        {{ username }} is typing...
      </q-chip>
    </div>
  </div>

  <q-dialog v-model="showPreview">
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">{{ selectedUser }}'s message</div>
      </q-card-section>

      <q-card-section>
        {{ typingMessage }}
      </q-card-section>
    </q-card>
  </q-dialog>

  <div
    v-if="channelStore.showUserList && channelStore.getSelectedChannel()"
    class="user-list-container"
  >
    <div class="user-list-header">
      <q-item-label class="text-h6"
        >Users in {{ currentChannel?.name }}
      </q-item-label>
      <q-btn
        flat
        icon="close"
        color="negative"
        @click="channelStore.handleUserList()"
        class="close-btn"
      />
    </div>
    <div class="user-row">
      <q-item
        v-for="user in currentChannel?.users ?? []"
        :key="user.username"
        class="user-item"
      >
        <q-item-section class="user-card">
          <q-item-label class="item-left">@{{ user.username }}</q-item-label>
          <q-item-label class="item-left status"
            >{{ returnStatus(user.status) }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
  <div class="full-width items-center bg-white panel">
    <q-editor
      v-model="messageText"
      :toolbar="[['bold', 'italic', 'strike', 'underline']]"
      @keydown="onKeyDown"
      placeholder="Type a message"
      aria-placeholder="Type a message"
      min-height="3rem"
    />
    <q-btn
      round
      unelevated
      icon="send"
      color="secondary"
      @click="sendMessage"
      class="send-button"
    />
  </div>
</template>

<style scoped>
.q-editor {
  border-color: #00a699;
  flex: 1;
}

.user-card {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.user-card .q-item-section {
  font-size: 1.2rem;
  font-weight: bold;
}

.item-left {
  text-align: start;
}

.status {
  font-size: 0.8rem;
}

.panel {
  display: flex;
  gap: 10px;
}

.user-list-container {
  max-height: 300px;
  overflow-y: auto;
}

.user-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  margin: 0;
  padding: 0;
}

.user-row {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 15px;
}

.user-item {
  flex: 0 0 auto;
  text-align: center;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 10px;
}
</style>
