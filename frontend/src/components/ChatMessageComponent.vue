<script setup lang="ts">
import { QChatMessage } from 'quasar';
import { defineProps } from 'vue';

const item = defineProps({
  text: String,
  name: String,
  timestamp: String,
});

</script>

<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        :text="[item.text]"
        text-color="white"
        bg-color="primary"
      >
        <template v-slot:name>{{ item.name }}</template>
        <template v-slot:stamp>{{ item.timestamp }}</template>
        <template v-slot:avatar>
        </template>
      </q-chat-message>
    </div>
  </div>
</template>

<style scoped>
</style>
