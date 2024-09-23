<script setup lang="ts">
import ChatScrollComponent from 'components/ChatScrollComponent.vue';
import ChatTextFieldComponent from 'components/ChatTextFieldComponent.vue';
import { ref } from 'vue';

interface ChatItem {
  text: string;
  name: string;
  timestamp: string;
}

const items = ref<ChatItem[]>([]);

const addMessage = (message: string) => {
  const timestamp = new Date().toLocaleTimeString();
  items.value.push({ text: message, name: 'User', timestamp });
};
</script>

<template>
  <q-page class="flex flex-col">
  <div class="chat-page flex flex-grow flex-col">
      <div class="chat-scroll flex-1 overflow-y-auto p-4 bg-gray-300 h-full">
        <ChatScrollComponent :items="items" />
      </div>
      <div class="chat-input p-2 border-t border-gray-300 bg-gray-100 sticky bottom-0 z-10">
        <ChatTextFieldComponent @sendMessage="addMessage" />
      </div>
  </div>
  </q-page>
</template>

<style scoped>
</style>
