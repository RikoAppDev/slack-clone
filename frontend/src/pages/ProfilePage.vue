<script setup lang="ts">
import { ref } from 'vue';

const profileName = ref<string>('');
const email = ref<string>('');
const phone = ref<string>('');
const password = ref<string>('');

const changeInformation = ref<boolean>(true);

const visibilityOptions = [
  { label: 'Online', value: 'Online' },
  { label: 'Sleep', value: 'sleep' },
  { label: 'Invisible', value: 'invisible' },
  { label: 'Do Not Disturb', value: 'do-not-disturb' }
];
const selectedVisibility = ref<string>('Online');

const enableChange = () => {
  changeInformation.value = !changeInformation.value;
};
</script>

<template>
  <q-page class="flex flex-center">
    <div class="profile-page q-pa-md">
      <div class="flex flex-column items-center q-ma-md">

        <!-- Avatar -->
        <q-avatar class="full-width full-height" style="margin-bottom: 10px" square>
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>

        <!-- Visibility Status Dropdown -->
        <q-select
          outlined
          v-model="selectedVisibility"
          :options="visibilityOptions"
          label="Visibility Status"
          class="mb-4 full-width q-ma-md"
        />

        <!-- Profile Name -->
        <q-input
          outlined
          :disable="changeInformation"
          v-model="profileName"
          label="Profile Name"
          type="text"
          name="profileName"
          class="mb-4 full-width q-ma-md"
        />

        <!-- Email Address -->
        <q-input
          outlined
          :disable="changeInformation"
          v-model="email"
          label="Email Address"
          type="email"
          name="email"
          class="mb-4 full-width q-ma-md"
        />

        <!-- Phone Number -->
        <q-input
          outlined
          :disable="changeInformation"
          v-model="phone"
          label="Phone Number"
          type="tel"
          name="phone"
          class="mb-4 full-width q-ma-md"
        />

        <!-- Password -->
        <q-input
          outlined
          :disable="changeInformation"
          v-model="password"
          label="Password"
          type="password"
          class="mb-4 full-width q-ma-md"
        />

        <!-- Button to toggle between 'Edit' and 'Save' -->
        <q-btn
          unelevated
          no-caps
          :outline="changeInformation"
          :label="changeInformation ? 'Edit Profile' : 'Save Information'"
          color="primary"
          class="p-4 full-width text-base flex font-medium rounded q-ma-md"
          @click="enableChange"
        />
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.profile-page {
  max-width: 400px;
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
