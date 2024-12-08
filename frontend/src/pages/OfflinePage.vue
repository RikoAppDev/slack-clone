<template>
  <div class="offline-container q-pa-md">
    <div class="wrapper">
      <q-icon name="wifi_off" size="100px" color="grey-7" />
      <h4 class="text-h4 q-mt-md">You're Offline</h4>
      <p class="text-body1 q-mt-md">
        Please check your internet connection to access all features of our application.
        Our app requires an internet connection to:
      </p>
      <ul class="text-left q-mt-md">
        <li>Sync your data in real-time</li>
        <li>Access the latest updates</li>
        <li>Interact with other users</li>
      </ul>
      <q-btn
        color="primary"
        label="Retry Connection"
        unelevated
        @click="checkConnection"
        class="q-mt-lg"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OfflinePage',
  methods: {
    checkConnection() {
      window.location.reload()
    }
  }
})
</script>

<style scoped>
.offline-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  text-align: center;
}
</style>
