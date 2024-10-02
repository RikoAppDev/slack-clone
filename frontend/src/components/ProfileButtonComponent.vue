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
        <div class="column text-subtitle1 ">
          <p>{{ name }}</p>
          <p class="text-black">{{ tag }}</p>
        </div>

        <q-btn
          color="primary"
          label="Logout"
          unelevated
          size="sm"
          v-close-popup
          to="/login"
          icon="logout"
        />
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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

const group = ref('online');

const options = [
  { label: 'Online', value: 'online', color: 'green' },
  { label: 'Invisible', value: 'invisible', color: 'grey' },
  { label: 'Offline', value: 'offline', color: 'red' },
];
</script>
