<template>
  <q-btn
    v-if="channelStore.getSelectedChannel()"
    unelevated
    size="18px"
    :icon="
      channelStore.getSelectedChannel()?.role == MembershipRole.ADMIN
        ? 'delete_forever'
        : 'exit_to_app'
    "
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
    <p v-if="channelStore.getSelectedChannel()?.role == MembershipRole.ADMIN">
      Delete channel, ⌨️ <code>/quit</code> or <code>/cancel</code>
    </p>
    <p v-else>Leave channel, ⌨️ <code>/cancel</code></p>
  </q-tooltip>
</template>

<script setup lang="ts">
import { useChannelStore } from '../stores/channelStore';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { MembershipRole } from '../types/enum';

const $q = useQuasar();
const channelStore = useChannelStore();
const currentChannel = ref(channelStore.getSelectedChannel());

const handleLeaveChannel = async () => {
  currentChannel.value = channelStore.getSelectedChannel();
  if (currentChannel.value) {
    const channelRole = currentChannel.value.role;

    try {
      if (channelRole === MembershipRole.ADMIN) {
        await channelStore.removeChannel(currentChannel.value.name);
      } else {
        await channelStore.quitChannel(currentChannel.value.name);
      }

      if (channelStore.channels.length > 0) {
        channelStore.selectChannel(channelStore.channels[0]);
      } else {
        currentChannel.value = null;
      }
      $q.notify({
        type: 'positive',
        position: 'top',
        message:
          channelRole === MembershipRole.ADMIN
            ? 'Channel deleted successfully'
            : 'Channel left successfully',
      });
    } catch (error) {
      $q.notify({
        type: 'negative',
        message:
          channelRole === MembershipRole.ADMIN
            ? 'Failed to remove channel'
            : 'Failed to leave channel',
        position: 'top',
      });
    }
  }
  currentChannel.value = channelStore.getSelectedChannel();
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
