<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useMessageStore } from '../stores/messageStore';
import { useChannelStore } from '../stores/channelStore';

const channelStore = useChannelStore();
const currentChannel = channelStore.getSelectedChannel();

const messageStore = useMessageStore();
const messageText = ref('');

const commandRegex = /^\/(join\s+\w+(\s+private)?|invite\s+\w+\s+a|revoke\s+\w+|kick\s+\w+|quit|cancel)$/;

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
  // match[0] is the full command, match[1] is the command without the '/' at the beginning
  const parts = match[1].split(/\s+/);

  if (parts[0] === 'join') {
    const channelName = parts[1];
    const isPrivate = parts[2] === 'private';
    console.log(`Join command detected: channelName=${channelName}, private=${isPrivate}`);

  } else if (parts[0] === 'invite') {
    const nickName = parts[1];
    console.log(`Invite command detected: nickName=${nickName}`);

  } else if (parts[0] === 'revoke') {
    const nickName = parts[1];
    console.log(`Revoke command detected: nickName=${nickName}`);

  } else if (parts[0] === 'kick') {
    const nickName = parts[1];
    console.log(`Kick command detected: nickName=${nickName}`);

  } else if (parts[0] === 'quit') {
    console.log(`Quit command detected: currentChannel=${currentChannel}`);

  } else if (parts[0] === 'cancel') {
    console.log(`Cancel command detected: currentChannel=${currentChannel}`);

  }
};

const sendMessage = () => {
  const decodedMessage = decodeHTMLEntities(messageText.value);
  const trimmedMessage = decodedMessage.trim();

  if (trimmedMessage !== '') {
    if (commandRegex.test(trimmedMessage)) {
      handleCommand(trimmedMessage);
    } else {
      messageStore.addMessage(trimmedMessage);
    }
    messageText.value = '';

    nextTick(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }
};
</script>

<template>
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
</style>
