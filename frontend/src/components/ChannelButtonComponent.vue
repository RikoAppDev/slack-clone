<template>
  <div v-if="isInvitation" class="invitation-wrapper">
    <p class="text-body2 invite ellipsis" @click="notifyOnInvitationClick">
      {{ `🔔 Invitation to ${name}` }}
    </p>
    <div class="actions">
      <q-btn unelevated size="14px" flat rounded @click="acceptInvitation"
        >✅ Accept
      </q-btn>
      <q-btn unelevated size="14px" flat rounded @click="rejectInvitation"
        >❌ Reject
      </q-btn>
    </div>
  </div>
  <q-btn
    v-else
    unelevated
    size="18px"
    :to="link"
    no-caps
    :class="
      isSelected
        ? 'wrapper full-width row content-start selected'
        : 'wrapper full-width row content-start'
    "
  >
    <p class="text-body2 ellipsis">
      {{ private ? `🔒: ${name}` : `🔓: ${name}` }}
    </p>
  </q-btn>
</template>

<script setup lang="ts">
import { useChannelStore } from '../stores/channelStore';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const channelStore = useChannelStore();

function notifyOnInvitationClick() {
  $q.notify({
    type: 'negative',
    message: 'You need to accept invite to enter this channel',
    position: 'top',
  });
}

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  private: {
    type: Boolean,
    required: true,
  },
  isSelected: {
    type: Boolean,
    required: true,
  },
  isInvitation: {
    type: Boolean,
    required: false,
  },
});

const acceptInvitation = () => {
  const originalChannel = channelStore.channels.find(
    (channel) => channel.name === props.name
  );
  console.log(originalChannel);
  if (originalChannel) {
    originalChannel.isInvitation = false;
    channelStore.selectChannel(originalChannel);
  } else {
    channelStore.addNewChannel({
      name: props.name,
      private: false,
    });
  }
};

const rejectInvitation = () => {
  channelStore.removeChannel(props.name);
};
</script>

<style scoped>
.wrapper {
  border-radius: 50px;
  transition: border-radius 150ms ease-in-out;
}

.wrapper:hover {
  border-radius: 10px;
}

.selected:before {
  border-left: 2px solid #00a699;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

p {
  margin: 0;
  width: inherit;
}

.invitation-wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 10px;
  width: 100%;
}

.actions {
  display: flex;
  gap: 2px;
  margin-top: 10px;
}
</style>
