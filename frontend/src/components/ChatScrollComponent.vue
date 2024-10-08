<script setup lang="ts">
import { useMessageStore } from '../stores/messageStore';
import ChatMessageComponent from 'components/ChatMessageComponent.vue';

const messageStore = useMessageStore();
</script>

<template>
  <div ref="chatContainer" class="full-width full-height q-px-sm q-scroll">
    <q-infinite-scroll reverse>
      <template>
        <div class="row justify-center q-my-md">
          <q-spinner color="primary" name="dots" size="40px" />
        </div>
      </template>
      <div
        v-for="(item, index) in messageStore.messages"
        :key="index"
        class="row no-wrap items-start"
      >
        <ChatMessageComponent
          :text="item.text"
          :name="item.name"
          :timestamp="item.timestamp"
        />
      </div>
    </q-infinite-scroll>
  </div>
</template>

<style scoped>
.full-width {
  width: 100%;
}

.full-height {
  height: 100%;
}

.q-scroll {
  overflow-y: auto;
}
</style>
