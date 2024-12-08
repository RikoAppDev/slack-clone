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
    <template v-if="role == MembershipRole.ADMIN">
      <p class="text-body2 ellipsis channel-name text-left">
        {{ private ? `🔒: ${name}` : `🔓: ${name}` }}
      </p>
      <p class="admin">👑</p>
    </template>
    <template v-else>
      <p class="text-body2 ellipsis text-left">
        {{ private ? `🔒: ${name}` : `🔓: ${name}` }}
      </p>
    </template>
  </q-btn>
</template>

<script setup lang="ts">
import { useChannelStore } from '../stores/channelStore';
import { useQuasar } from 'quasar';
import { MembershipRole } from '../types/enum';

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
  role: {
    type: String,
    required: false,
  },
  isInvitation: {
    type: Boolean,
    required: false,
  },
});

const acceptInvitation = async () => {
  try {
    await channelStore.acceptInvitation(props.name);

    $q.notify({
      type: 'positive',
      message: 'Invite accepted successfully',
      position: 'top',
    });
  } catch (error: any) {
    $q.notify({
      type: 'negative',
      message: error.message || 'An error occurred',
      position: 'top',
    });
  }
};

const rejectInvitation = async () => {
  try {
    await channelStore.rejectInvitation(props.name);

    $q.notify({
      type: 'positive',
      message: `Invitation to ${props.name} channel was rejected`,
      position: 'top',
    });
  } catch (error: any) {
    $q.notify({
      type: 'negative',
      message: error.message || 'An error occurred',
      position: 'top',
    });
  }
};
</script>

<style scoped>
::v-deep(.q-btn__content) {
  width: inherit;
}

.wrapper {
  border-radius: 50px;
  transition: border-radius 150ms ease-in-out;
}

.admin {
  width: 20%;
}

.channel-name {
  width: 80%;
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
