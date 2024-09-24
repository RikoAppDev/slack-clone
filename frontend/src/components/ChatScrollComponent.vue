<script setup lang="ts">
import { defineProps } from 'vue';
import ChatMessageComponent from 'components/ChatMessageComponent.vue';

defineProps<{
  items: Record<string, any>[],
}>();

</script>

<template>
  <div ref="chatContainer" class="w-full h-full overflow-y-auto">
    <q-infinite-scroll reverse>
      <div v-for="(item, index) in items" :key="index" class="flex justify-start">
        <ChatMessageComponent :text="item.text" :name="item.name" :timestamp="item.timestamp" />
      </div>
    </q-infinite-scroll>
  </div>
</template>

<style scoped>
</style>
