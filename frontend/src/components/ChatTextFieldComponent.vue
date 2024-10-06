<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  sendMessage: [message: string];
}>();

const messageText = ref('');

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
};

const sendMessage = () => {
  if (messageText.value.trim() !== '') {
    emit('sendMessage', messageText.value);
    messageText.value = '';
  }
};
</script>

<template>
  <div class="full-width items-center bg-white panel">
    <!-- Message Input Field -->
    <q-editor
      v-model="messageText"
      :toolbar="[['bold', 'italic', 'strike', 'underline']]"
      @keydown="onKeyDown"
      placeholder="Type a message"
      aria-placeholder="Type a message"
      min-height="5rem"
    />

    <!-- Send Button -->
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
  flex-wrap: nowrap;
  gap: 10px;
}
</style>
