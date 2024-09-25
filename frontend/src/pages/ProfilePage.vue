<script setup lang="ts">
import { ref } from 'vue';

const profileName = ref<string>('');
const email = ref<string>('');
const phone = ref<string>('');
const password = ref<string>('');
const changeInformation = ref<boolean>(true);

const enableChange = () => {
  changeInformation.value = !changeInformation.value;
}

</script>

<template>
  <q-page>
    <div class="profile-page flex flex-col items-center">
      <div class="q-pa-md q-gutter-sm">
        <div class="flex justify-center">
          <q-avatar square size="100px">
            <img src="https://cdn.quasar.dev/img/avatar.png"/>
          </q-avatar>
        </div>

        <!-- Profile Name -->
        <q-input
          outlined
          :disable="changeInformation"
          v-model="profileName"
          label="Profile Name"
          type="text"
          name="profileName"
          class="mb-4 full-width"
        />

        <!-- Email Address -->
        <q-input
          outlined
          :disable="changeInformation"
          v-model="email"
          label="Email Address"
          type="email"
          name="email"
          class="mb-4 full-width"
        />

        <!-- Phone Number -->
        <q-input
          outlined
          :disable="changeInformation"
          v-model="phone"
          label="Phone Number"
          type="tel"
          name="phone"
          class="mb-4 full-width"
        />

        <!-- Password -->
        <q-input
          outlined
          :disable="changeInformation"
          v-model="password"
          label="Password"
          type="password"
          class="mb-4 full-width"
        />

        <!-- Button to toggle between 'Edit' and 'Save' -->
        <q-btn
          unelevated
          no-caps
          :outline="changeInformation"
          :label="changeInformation ? 'Edit Profile' : 'Save Information'"
          color="primary"
          class="p-4 full-width text-base flex font-medium rounded self-end"
          @click="enableChange"
        />
      </div>
    </div>
  </q-page>
</template>

