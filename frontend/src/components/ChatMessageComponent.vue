<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  text: string;
  name: string;
  timestamp: string;
}>();

const highlightMentions = (text: string) => {
  const mentionRegex = /(@\w+)/g;
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
  line-height: 1.3rem;
}

.q-message-name {
  font-size: 1rem;
  color: #ff5a5f;
}

.tag {
  color: #ff5a5f;
  background: rgba(255, 90, 95, 0.1);
  padding: 0 2px 2px 2px;
  border-radius: 4px;
}
</style>
