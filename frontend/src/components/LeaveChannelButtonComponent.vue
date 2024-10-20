<template>
  <q-btn
    unelevated
    size="18px"
    icon="exit_to_app"
    no-caps
    @click="handleLeaveChannel"
    class="text-body1 bg-white add-button full-width"
  />
  <q-tooltip
    anchor="center end"
    self="center start"
    transition-show="jump-right"
    transition-hide="jump-left"
    class="bg-grey-8 text-white text-body2 q-pa-sm"
  >
    Leave a Channel
  </q-tooltip>
</template>

<script setup lang="ts">
import { useChannelStore } from '../stores/channelStore';
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const $q = useQuasar();
const channelStore = useChannelStore();
const currentChannel = ref(channelStore.getSelectedChannel());

const handleLeaveChannel = () => {
  currentChannel.value = channelStore.getSelectedChannel()
  if (currentChannel.value) {
    channelStore.removeChannel(currentChannel.value.name);
    if (channelStore.channels.length > 0) {
      channelStore.selectChannel(channelStore.channels[0]);
    } else {
      currentChannel.value = null;
    }
    $q.notify({
      type: 'positive',
      message: 'Channel left successfully',
      position: 'top',
    });
  }
};
</script>

<style scoped>
.add-button {
  border-radius: 50px;
  transition: border-radius 150ms ease-in-out;
}

.add-button:hover {
  border-radius: 10px;
}

.modal {
  width: 400px;
}
</style>
