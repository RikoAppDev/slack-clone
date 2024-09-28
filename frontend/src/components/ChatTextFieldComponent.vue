<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  sendMessage: [message: string];
}>();

const messageText = ref('');

const sendMessage = () => {
  if (messageText.value.trim()) {
    emit('sendMessage', messageText.value);
    messageText.value = '';
  }
};
</script>

<template>
  <div class="row full-width items-center q-gutter-sm bg-white">
    <!-- Message Input Field -->
    <q-input
      v-model="messageText"
      outlined
      rounded
      bg-color="white"
      color="secondary"
      label="Type a message"
      label-color="primary"
      @keyup.enter="sendMessage"
      class="col-grow"
    />

    <!-- Send Button -->
    <q-btn
      round
      icon="send"
      color="secondary"
      @click="sendMessage"
      class="send-button"
    />
  </div>
</template>
