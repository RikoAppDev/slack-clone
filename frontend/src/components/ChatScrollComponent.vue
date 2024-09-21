<script setup lang="ts">
import { defineProps, ref, nextTick, watch } from 'vue';
import ChatMessageComponent from 'components/ChatMessageComponent.vue';

const props = defineProps({
  items: Array,
});

const chatContainer = ref<HTMLElement | null>(null);

watch(
  () => props.items,
  async () => {
    await nextTick();
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  },
  { deep: true }
);
</script>

<template>
  <div ref="chatContainer" class="p-4 w-full h-full overflow-y-auto">
    <q-infinite-scroll reverse>
      <div v-for="(item, index) in props.items" :key="index" class="py-2 flex justify-start">
        <ChatMessageComponent :text="item.text" :name="item.name" :timestamp="item.timestamp" />
      </div>
    </q-infinite-scroll>
  </div>
</template>

<style scoped>
</style>
