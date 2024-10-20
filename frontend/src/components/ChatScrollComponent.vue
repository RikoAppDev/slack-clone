<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMessageStore } from '../stores/messageStore';
import { useChannelStore } from '../stores/channelStore';
import ChatMessageComponent from 'components/ChatMessageComponent.vue';

const messageStore = useMessageStore();
const channelStore = useChannelStore();

const currentChannel = ref(channelStore.getSelectedChannel());

watch(
  () => channelStore.getSelectedChannel(),
  async (newChannel) => {
    if (newChannel) {
      currentChannel.value = newChannel;
      if (!messageStore.messages[newChannel.name]) {
        await messageStore.fetchMessagesForChannel(newChannel.name, 1);
      }
    }
  }
);

async function onLoad(index: number, done: VoidFunction) {
  setTimeout(async () => {
    if (currentChannel.value) {
      const newMessages = await messageStore.fetchMessagesForChannel(currentChannel.value.name, index);
      messageStore.messages[currentChannel.value.name] = [...newMessages];
    }
    done();
  }, 500);
}
</script>

<template>
  <div class="full-width full-height q-px-sm q-scroll">
    <q-infinite-scroll @load="onLoad" reverse>
      <div
        v-for="(item, index) in currentChannel?.name ? messageStore.messages[currentChannel.name] ?? [] : []"
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
