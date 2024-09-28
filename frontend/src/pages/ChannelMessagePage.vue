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
    <div class="chat-page full-width column q-gutter-sm q-mb-lg" style="flex-grow: 1; overflow-y: auto;">
      <div class="chat-scroll full-width q-pa-md">
        <ChatScrollComponent :items="messages" />
      </div>
    </div>

    <!-- Chat Input at the Bottom -->
    <q-page-sticky position="bottom" class="full-width q-pa-none">
      <ChatTextFieldComponent @sendMessage="addMessage" />
    </q-page-sticky>
  </q-page>
</template>
