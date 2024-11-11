<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMessageStore } from '../stores/messageStore';
import { useChannelStore } from '../stores/channelStore';
import ChatMessageComponent from 'components/ChatMessageComponent.vue';

const messageStore = useMessageStore();
const channelStore = useChannelStore();
const currentChannel = ref(channelStore.selectedChannel);
const page = ref(1);

watch(
  () => channelStore.selectedChannel,
  async (newChannel) => {
    if (newChannel) {
      page.value = 1;
      currentChannel.value = newChannel;
      await messageStore.fetchMessagesForChannel(currentChannel.value.name, page.value);
    }
  }
);

async function onLoad(index: number, done: VoidFunction) {
  if (currentChannel.value?.name && messageStore.hasMoreMessages[currentChannel.value.name]) {
    await messageStore.fetchMessagesForChannel(currentChannel.value.name, page.value + 1);
    page.value++;
  }
  done();
}
</script>

<template>
  <div class="full-width full-height q-px-sm q-scroll">
    <q-infinite-scroll @load="onLoad" reverse>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner color="primary" name="dots" size="40px" />
        </div>
      </template>
      <div v-if="currentChannel?.name && messageStore.messages[currentChannel.name]?.length">
        <div
          v-for="(item, index) in  [...messageStore.messages[currentChannel.name]]"
          :key="index"
          class="row no-wrap items-start"
        >
          <ChatMessageComponent
            :text="item.text"
            :name="item.name"
            :timestamp="item.timestamp"
          />
        </div>
      </div>
    </q-infinite-scroll>
  </div>
</template>
