<script setup lang="ts">
import { defineProps } from 'vue';

const item = defineProps({
  text: String,
  name: String,
  timestamp: String,
});
</script>

<template>
  <div class="q-pa-md flex justify-center">
    <div class="w-full max-w-md">
      <div class="flex flex-col">
        <div class="name bg-gray-300 text-black p-2 rounded-t-md">
          {{ item.name }}
        </div>
        <div class="message bg-gray-200 text-black p-2 rounded-b-md mb-1">
          {{ item.text }}
        </div>
        <div class="timestamp text-gray-500 text-xs">
          {{ item.timestamp }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
