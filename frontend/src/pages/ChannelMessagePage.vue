<script setup lang="ts">
import ChatScrollComponent from 'components/ChatScrollComponent.vue';
import ChatTextFieldComponent from 'components/ChatTextFieldComponent.vue';
import { ref, nextTick } from 'vue';

interface ChatItem {
  text: string;
  name: string;
  timestamp: string;
}

const messages = ref<ChatItem[]>([]);

const addMessage = (message: string) => {
  const timestamp = new Date().toLocaleTimeString();
  messages.value.push({ text: message, name: 'User', timestamp });

  nextTick(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
};
</script>

<template>
  <q-page class="q-pa-none column full-height">
    <!-- Chat Content Area -->
    <div class="chat-page full-width column q-gutter-sm" style="flex-grow: 1; overflow-y: auto;">
      <div class="full-width q-pa-md" style="flex-grow: 1; overflow-y: auto;">
        <ChatScrollComponent :items="messages" />
      </div>
    </div>

    <!-- Chat Input at the Bottom -->
    <div class="chat-input sticky full-width bg-white">
      <ChatTextFieldComponent @sendMessage="addMessage" />
    </div>
  </q-page>
</template>

<style scoped>
.chat-input {
  position: sticky;
  bottom: 0;
  z-index: 1;
  padding-bottom: 15px;
  padding-right: 10px;
}
</style>
