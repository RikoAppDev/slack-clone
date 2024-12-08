<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import NotificationService from './services/NotificationService';

onMounted((): void => {
  NotificationService.requestPermission();
});
</script>
