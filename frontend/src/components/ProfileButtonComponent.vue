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
        <q-option-group :options="options" v-model="group" />
      </div>

      <q-separator vertical inset class="q-mx-lg" />

      <div class="column justify-center items-center">
        <div class="column text-subtitle1">
          <p>{{ name }}</p>
          <p class="text-black">{{ tag }}</p>
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
import { Status } from '../types/user';

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();

defineProps({
  name: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

const group = ref(userStore.status);

const options = [
  { label: 'Online', value: Status.ONLINE, color: 'green' },
  { label: 'Invisible', value: Status.INVISIBLE, color: 'grey' },
  { label: 'Offline', value: Status.OFFLINE, color: 'red' },
];

const handleLogout = async () => {
  $q.notify({
    type: 'positive',
    message: 'Logout successful',
    position: 'top',
  });
  await router.push('/login');
};
</script>
