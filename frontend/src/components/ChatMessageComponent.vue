<script setup lang="ts">
import { defineProps } from 'vue';

// Define props for the component
const props = defineProps<{
  text: string;
  name: string;
  timestamp: string;
}>();

// Helper method to highlight mentions in the message
const highlightMentions = (text: string) => {
  // Use regex to match @username pattern
  const mentionRegex = /(@\w+)/g;
  // Replace the matches with a span that highlights the username
  return text.replace(mentionRegex, '<span class="tag">$1</span>');
};
</script>

<template>
  <div class="flex justify-center">
    <q-chat-message
      :name="props.name"
      :stamp="props.timestamp"
      bg-color="white"
      text-color="black"
    >
      <!-- Render the highlighted text with v-html -->
      <div v-html="highlightMentions(props.text)"></div>
    </q-chat-message>
  </div>
</template>

<style>
.q-message-text {
  padding: 0;
}

.q-message-name {
  color: #ff5a5f;
}

.tag {
  color: #ff5a5f;
  background: rgba(255, 90, 95, 0.1);
  padding: 0 2px 2px 2px;
  border-radius: 4px;
}
</style>
