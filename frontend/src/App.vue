<template>
  <router-view v-if="networkStore.isOnline" />
  <offline-page v-else />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useNetworkStore } from './stores/network'
import OfflinePage from './pages/OfflinePage.vue'
import NotificationService from './services/NotificationService';

const networkStore = useNetworkStore()

const handleNetworkChange = (): void => {
  if (typeof window !== 'undefined') {
    networkStore.setOnlineStatus(window.navigator.onLine)
  }
}

onMounted((): void => {
  if (typeof window !== 'undefined') {
    window.addEventListener('online', handleNetworkChange)
    window.addEventListener('offline', handleNetworkChange)
  }

  NotificationService.requestPermission()
})

onUnmounted((): void => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('online', handleNetworkChange)
    window.removeEventListener('offline', handleNetworkChange)
  }
})
</script>
