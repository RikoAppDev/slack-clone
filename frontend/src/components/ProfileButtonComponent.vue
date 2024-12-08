<template>
  <q-btn-dropdown
    unelevated
    color="primary"
    :label="name"
    content-class="q-mt-lg column flex-center"
    dropdown-icon="settings"
  >
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <q-option-group
          keep-color
          size="sm"
          :options="options"
          v-model="status"
          @update:model-value="handleStatusChange"
        />
      </div>

      <q-separator vertical inset class="q-mx-lg" />

      <div class="column justify-center items-center">
        <div class="column text-subtitle1 items-center">
          <p class="q-ma-none">{{ name }}</p>
          <p class="text-dark text-bold">{{ tag }}</p>
        </div>

        <q-btn
          color="primary"
          label="Logout"
          unelevated
          size="sm"
          v-close-popup
          icon="logout"
          @click="handleLogout"
        />
      </div>
    </div>

    <div class="q-mb-md column">
      <q-toggle
        :disable="status === UserStatus.DND || status === UserStatus.OFFLINE"
        :title="
          status === UserStatus.OFFLINE
            ? 'No notifications will be received while offline'
            : status === UserStatus.DND
            ? 'No notifications will be received while in DND mode'
            : notifyOnlyMentions
            ? 'Change to notify all messages'
            : 'Change to notify only mentions'
        "
        v-model="notifyOnlyMentions"
        label="Notify only mentions"
        @update:model-value="toggleNotificationSettings"
      />
    </div>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { useMessageStore } from '../stores/messageStore';
import { useChannelStore } from '../stores/channelStore';
import { useAppPreferencesStore } from '../stores/appPreferences';
import { UserStatus } from '../types/enum';

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();
const appPreferencesStore = useAppPreferencesStore();

const name = userStore.getFullName;
const tag = '@' + userStore.getUsername;

const status = ref(userStore.getStatus);
const notifyOnlyMentions = ref(
  appPreferencesStore.getUserNotificationSettings().notifyOnlyMentions
);

const options = [
  { label: 'Online', value: UserStatus.ONLINE, color: 'green' },
  { label: 'DND', value: UserStatus.DND, color: 'red' },
  { label: 'Offline', value: UserStatus.OFFLINE, color: 'grey' },
];

const handleStatusChange = async () => {
  try {
    await userStore.changeStatus(status.value || UserStatus.ONLINE);

    const messageStore = useMessageStore();
    const currentChannel = useChannelStore().getSelectedChannel()?.name;

    if (
      currentChannel &&
      messageStore.missedMessages[currentChannel]?.length > 0
    ) {
      $q.notify({
        type: 'info',
        message: `You have ${messageStore.missedMessages[currentChannel].length} new messages`,
        position: 'top',
      });
    }
  } catch (error) {
    console.error('Failed to update status:', error);
    $q.notify({
      type: 'negative',
      message: 'Failed to update status',
      position: 'top',
    });
  }
};

const toggleNotificationSettings = (): void => {
  appPreferencesStore.setUserNotificationSettings({
    notifyOnlyMentions: notifyOnlyMentions.value,
  });
};

const handleLogout = async () => {
  try {
    await userStore.logout(true);

    $q.notify({
      type: 'positive',
      message: 'Logout successful',
      position: 'top',
    });

    await router.push('/login');
  } catch (error: any) {
    console.log('Session logout failed');
    await router.push('/login');
  }
};
</script>
