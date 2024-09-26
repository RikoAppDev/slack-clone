<script setup lang="ts">
const item = defineProps<{
  text: string;
  name: string;
  timestamp: string;
}>();
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md">
      <div class="flex flex-col">
        <div class="name text-accent pl-2 pt-2 rounded-t-md">
          {{ item.name }}
        </div>
        <div class="message text-neutral-700 p-2 rounded-b-md">
          {{ item.text }}
        </div>
        <div class="timestamp text-gray-500 text-xs pl-2 pb-2">
          {{ item.timestamp }}
        </div>
      </div>
    </div>
  </div>
</template>
