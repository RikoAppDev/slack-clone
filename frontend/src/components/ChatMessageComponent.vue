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
  return text.replace(mentionRegex, '<span style="background: darkred;">$1</span>');
};
</script>


<template>
  <div class="flex justify-center">
    <q-chat-message
      :name="props.name"
      :stamp="props.timestamp"
      bg-color="primary"
      text-color="white"
    >
      <!-- Render the highlighted text with v-html -->
      <div v-html="highlightMentions(props.text)"></div>
    </q-chat-message>
  </div>
</template>

