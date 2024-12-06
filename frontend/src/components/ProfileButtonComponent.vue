<template>
  <!-- Visibility settings -->
  <q-btn-dropdown
    unelevated
    color="primary"
    :label="name"
    content-class="q-mt-lg"
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
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { UserStatus } from '../types/enum';

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();

const name = userStore.getFullName;
const tag = '@' + userStore.getUsername;

const status = ref(userStore.getStatus);

const options = [
  { label: 'Online', value: UserStatus.ONLINE, color: 'green' },
  { label: 'DND', value: UserStatus.DND, color: 'red' },
  { label: 'Offline', value: UserStatus.OFFLINE, color: 'grey' },
];

const handleStatusChange = () => {
  userStore.changeStatus(status.value || UserStatus.ONLINE);
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
