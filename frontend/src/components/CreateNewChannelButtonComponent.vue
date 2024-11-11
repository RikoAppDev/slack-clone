<template>
  <q-btn
    unelevated
    size="18px"
    icon="add"
    no-caps
    @click="handleOpeningModal"
    class="text-body1 bg-white add-button full-width"
  />
  <q-tooltip
    anchor="center end"
    self="center start"
    transition-show="jump-right"
    transition-hide="jump-left"
    class="bg-grey-8 text-white text-body2 q-pa-sm"
  >
    Add a Channel
  </q-tooltip>

  <q-dialog v-model="isModalOpen" @hide="setDefault">
    <q-card class="modal">
      <q-card-section>
        <div class="text-h6">Create a New Channel</div>
      </q-card-section>

      <q-card-section class="q-col-gutter-sm">
        <q-input
          autofocus
          v-model="newChannelName"
          label="Channel Name"
          outlined
          :onkeypress="onEnterPress"
        />
        <q-toggle v-model="newChannelPrivate" label="Private Channel" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancel"
          color="primary"
          @click="handleOpeningModal"
        />
        <q-btn
          label="Create"
          unelevated
          color="primary"
          @click="handleCreateChannel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useChannelStore } from '../stores/channelStore';
import { Channel } from '../types/channel';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const channelStore = useChannelStore();

const isModalOpen = ref(false);
const newChannelName = ref('');
const newChannelPrivate = ref(false);

const handleOpeningModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const setDefault = () => {
  newChannelName.value = '';
  newChannelPrivate.value = false;
};

const onEnterPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleCreateChannel();
  }
};

const handleCreateChannel = async () => {
  const channelName = newChannelName.value.trim();

  const newChannel: Channel = {
    name: channelName,
    isPrivate: newChannelPrivate.value,
  };

  if (channelName.length > 80) {
    $q.notify({
      type: 'negative',
      message: 'Channel name cannot be longer than 80 characters!',
      position: 'top',
    });
  } else if (channelName !== '') {
    try {
      await channelStore.addNewChannel(newChannel);

      setDefault();
      handleOpeningModal();
      channelStore.selectChannel(newChannel);

      $q.notify({
        type: 'positive',
        message: 'Channel created successfully',
        position: 'top',
      });
    } catch (error: any) {
      $q.notify({
        type: 'negative',
        message: error.message || 'Failed to add new channel',
        position: 'top',
      });
    }
  } else {
    $q.notify({
      type: 'negative',
      message: 'Channel name cannot be blank!',
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
