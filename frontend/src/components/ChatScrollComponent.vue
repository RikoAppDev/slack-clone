<script setup lang="ts">
import ChatMessageComponent from 'components/ChatMessageComponent.vue';

defineProps<{
  items: Record<string, any>[],
}>();
</script>

<template>
  <div ref="chatContainer" class="full-width full-height q-pa-sm q-scroll">
    <q-infinite-scroll reverse>
      <div v-for="(item, index) in items" :key="index" class="row no-wrap items-start">
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
