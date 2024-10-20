<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useMessageStore } from '../stores/messageStore';
import { useChannelStore } from '../stores/channelStore';
import { date } from 'quasar';

const channelStore = useChannelStore();
const currentChannel = ref(channelStore.getSelectedChannel());

const messageStore = useMessageStore();
const messageText = ref('');
const showUserList = ref(false);

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

const sendMessage = () => {
  const decodedMessage = decodeHTMLEntities(messageText.value);
  const trimmedMessage = decodedMessage.trim().replace(/<br\s*\/?>$/gi, '');

  if (trimmedMessage !== '' && currentChannel.value) {
    const message = {
      text: trimmedMessage,
      name: 'You',
      timestamp: date.formatDate(new Date(), 'HH:mm'),
      channelName: currentChannel.value.name,
    };
    messageStore.addMessage(message);
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
  showUserList.value = false;
};
</script>

<template>
  <div v-if="showUserList" class="user-list-container">
    <div class="user-list-header">
      <q-item-label class="text-h6">Users in {{ currentChannel?.name }}</q-item-label>
      <q-btn
        flat
        icon="close"
        color="negative"
        @click="closeUserList"
        class="close-btn"
      />
    </div>

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
