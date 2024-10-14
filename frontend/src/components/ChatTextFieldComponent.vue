<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useMessageStore } from '../stores/messageStore';
import { useChannelStore } from '../stores/channelStore';
import { Channel } from 'app/frontend/src/types/channel';

const channelStore = useChannelStore();
const currentChannel = ref(channelStore.getSelectedChannel());

const messageStore = useMessageStore();
const messageText = ref('');
const showUserList = ref(false); // Controls whether to show the user list

const commandRegex = /^\/(join\s+\w+(\s+private)?|invite\s+\w+\s+a|revoke\s+\w+|kick\s+\w+|quit|cancel|list)$/;

watch(() => channelStore.getSelectedChannel(), (newChannel) => {
  currentChannel.value = newChannel;
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

const handleCommand = (command: string) => {
  const match = command.match(commandRegex);

  if (!match) return;
  const parts = match[1].split(/\s+/);

  if (parts[0] === 'join') {
    const channelName = parts[1];
    const isPrivate = parts[2] === 'private';

    const existingChannel = channelStore.channels.find(channel => channel.name === channelName);

    if (!existingChannel) {
      const newChannel: Channel = {
        name: channelName,
        private: isPrivate,
      };

      channelStore.addNewChannel(newChannel);
    } else {
      channelStore.selectChannel(existingChannel);
    }
  } else if (parts[0] === 'list') {
    if (currentChannel.value) {
      showUserList.value = true; // Show user list when `/list` is used
      console.log(`Users in channel ${currentChannel.value.name}: ${(currentChannel.value.users ?? []).map(user => user.username).join(', ')}`);
    }
  }
};

const sendMessage = () => {
  const decodedMessage = decodeHTMLEntities(messageText.value);
  const trimmedMessage = decodedMessage.trim().replace(/<br\s*\/?>$/gi, '');

  if (trimmedMessage !== '') {
    if (commandRegex.test(trimmedMessage)) {
      handleCommand(trimmedMessage);
    } else {
      messageStore.addMessage(trimmedMessage);
    }
    messageText.value = '';

    nextTick(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    });
  }
};

const closeUserList = () => {
  showUserList.value = false; // Hide the user list when the close button is clicked
};
</script>

<template>
  <!-- Conditionally show the user list based on showUserList -->
  <div v-if="showUserList" class="user-list-container">
    <!-- Header with channel name and close button in the same row -->
    <div class="user-list-header">
      <q-item-label class="text-h6">Users in {{ currentChannel.name }}</q-item-label>
      <q-btn
        flat
        icon="close"
        color="negative"
        @click="closeUserList"
        class="close-btn"
      />
    </div>

    <!-- Horizontal scrolling row of users -->
    <div class="user-row">
      <q-item v-for="user in currentChannel?.users ?? []" :key="user.username" class="user-item">
        <q-item-section>
          <q-item-label>{{ user.username }}</q-item-label>
          <q-item-label caption>{{ user.status }}</q-item-label>
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
      min-height="5rem"
    />

    <q-btn
      round
      unelevated
      icon="send"
      color="secondary"
      @click="sendMessage"
      class="send-button gt-xs"
    />
  </div>
</template>

<style scoped>
.q-editor {
  border-color: #00a699;
  flex: 1;
}

.panel {
  display: flex;
  flex-wrap: nowrap;
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
