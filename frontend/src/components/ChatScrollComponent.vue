<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMessageStore } from '../stores/messageStore';
import { useChannelStore } from '../stores/channelStore';
import ChatMessageComponent from 'components/ChatMessageComponent.vue';

const messageStore = useMessageStore();
const channelStore = useChannelStore();

const currentChannel = ref(channelStore.getSelectedChannel());
const messages = ref(messageStore.fetchMessagesForChannel(currentChannel.value.name, 1));

watch(
  () => channelStore.getSelectedChannel(),
  (newChannel) => {
    messageStore.clearMessages();
    currentChannel.value = newChannel;
    messages.value = messageStore.fetchMessagesForChannel(newChannel.name, 1);
  }
);

async function onLoad(index: number, done: VoidFunction) {
  const newMessages = messageStore.fetchMessagesForChannel(currentChannel.value.name, index);
  messages.value = [...newMessages, ...messages.value];
  done();
}
</script>

<template>
  <div class="full-width full-height q-px-sm q-scroll">
    <q-infinite-scroll @load="onLoad" reverse>
      <div
        v-for="(item, index) in messages"
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
