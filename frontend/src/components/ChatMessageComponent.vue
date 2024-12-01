<script setup lang="ts">
import { nextTick } from 'vue';
import { useUserStore } from '../stores/user';

const props = defineProps<{
  text: string;
  name: string;
  timestamp: string;
}>();

const formatTimestamp = (timestamp: string) =>
  new Date(timestamp).toLocaleString('en-GB', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const highlightMentions = (text: string) => {
  const mentionRegex = /(@\w+)/g;
  const username = useUserStore().user?.username;

  nextTick(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  });

  if (mentionRegex.test(text)) {
    const mentionedUser = text.match(mentionRegex)?.[0].substring(1); 
    if (mentionedUser === username) {
      return `<span class="user_tag">${text}</span>`;
    }
  }

  return text.replace(mentionRegex, '<span class="tag">$1</span>');
};
</script>

<template>
  <div class="flex justify-center">
    <q-chat-message
      :name="props.name"
      :stamp="formatTimestamp(props.timestamp)"
      bg-color="white"
      text-color="black"
    >
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

.user_tag {
  background: #ff5a5f;
  padding: 0 2px 2px 2px;
  border-radius: 4px;
  color: white;
}
</style>
