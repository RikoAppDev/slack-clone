<script setup lang="ts">
import { watch } from 'vue';
import ChatScrollComponent from 'components/ChatScrollComponent.vue';
import ChatTextFieldComponent from 'components/ChatTextFieldComponent.vue';
import { useMessageStore } from '../stores/messageStore';
import { useChannelStore } from '../stores/channelStore';

const messageStore = useMessageStore();
const channelStore = useChannelStore();

watch(() => channelStore.selectedChannel, (newChannel) => {
  messageStore.fetchMessagesForChannel(newChannel.name);
});

</script>

<template>
  <q-page class="q-pa-none column full-height">
    <!-- Chat Content Area -->
    <div
      class="chat-page full-width column"
      style="flex-grow: 1; overflow-y: auto"
    >
      <div class="full-width q-pa-md" style="flex-grow: 1; overflow-y: auto">
        <ChatScrollComponent :items="messageStore.messages" />
      </div>
    </div>

    <!-- Chat Input at the Bottom -->
    <div class="chat-input sticky q-pa-sm full-width bg-white">
      <ChatTextFieldComponent />
    </div>
  </q-page>
</template>

<style scoped>
.chat-input {
  position: sticky;
  bottom: 0;
  z-index: 1;
}
</style>
