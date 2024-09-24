<script setup lang="ts">
import { ref, defineEmits } from 'vue';

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
  <div class="flex items-center p-2">
    <div class="flex-grow mr-2">
      <q-input
        v-model="messageText"
        outlined
        rounded
        color="secondary"
        label-color="primary"
        label="Type a message"
        @keyup.enter="sendMessage"
        class="max-h-24 overflow-y-auto"
        :style="{ maxHeight: '100px', whiteSpace: 'nowrap' }"
      />
    </div>
    <q-btn
      round
      icon="send"
      color="secondary"
      @click="sendMessage"
      class="w-auto"
    />
  </div>
</template>
