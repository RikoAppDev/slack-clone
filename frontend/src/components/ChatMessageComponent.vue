<script setup lang="ts">
const item = defineProps<{
  text: string;
  name: string;
  timestamp: string;
}>();
</script>

<template>
  <div class="flex justify-center">
    <q-chat-message
      :name="item.name"
      :text="[item.text]"
      :stamp="item.timestamp"
      bg-color="primary"
      text-color="white"
    />
  </div>
</template>
