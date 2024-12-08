<script setup lang="ts">
import { nextTick } from 'vue';
import { useUserStore } from '../stores/user';
import { isTaggedCurrentUser } from '../utils/mentionFinder';

const userStore = useUserStore();

const username = userStore.user?.username;

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

  nextTick(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  });

  return text.replace(mentionRegex, '<span class="tag">$1</span>');
};
</script>

<template>
  <div
    :class="
      isTaggedCurrentUser(props.text, username || '')
        ? 'message-wrapper user-tag'
        : 'message-wrapper'
    "
  >
    <div class="message">
      <p class="q-ma-none message-name">{{ props.name }}</p>
      <p class="message-text" v-html="highlightMentions(props.text)"></p>
      <p class="q-ma-none text-caption">
        {{ formatTimestamp(props.timestamp) }}
      </p>
    </div>
  </div>
</template>

<style>
.message-wrapper {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  padding: 0 2rem 0 2rem;
}

.message {
  display: flex;
  flex-direction: column;
}

.message-text {
  padding: 0;
  margin-bottom: 4px;
  margin-top: 2px;
  line-height: 1.3rem;
}

.message-name {
  font-size: 1rem;
  color: #ff5a5f;
}

.text-caption {
  margin-bottom: 4px;
  color: gray;
}

.tag {
  color: #ff5a5f;
  background: rgba(255, 90, 95, 0.1);
  padding: 0 2px 2px 2px;
  border-radius: 4px;
}

.user-tag {
  background: rgba(0, 166, 153, 0.05);
  border-left: 4px solid #00a699;
  padding-left: calc(2rem - 4px);
}
</style>
