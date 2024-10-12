<script setup lang="ts">
import ChatScrollComponent from 'components/ChatScrollComponent.vue';
import ChatTextFieldComponent from 'components/ChatTextFieldComponent.vue';
</script>

<template>
  <q-page class="q-pa-none column full-height">
    <!-- Chat Content Area -->
    <div
      class="chat-page full-width column"
      style="flex-grow: 1; overflow-y: auto"
    >
      <div class="full-width q-pa-md" style="flex-grow: 1; overflow-y: auto">
        <ChatScrollComponent />
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
