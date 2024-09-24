<script setup lang="ts">


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
        <q-input
          outlined
          v-model="profileName"
          label="Profile Name"
          type="text"
          name="profileName"
          class="mb-4"
        />
        <q-input
          outlined
          v-model="email"
          label="Email Address"
          type="email"
          name="email"
          class="mb-4"
        />
        <q-input
          outlined
          v-model="phone"
          label="Phone Number"
          type="phone"
          name="phone"
          class="mb-4"
        />
        <q-input
          outlined
          v-model="password"
          label="Password"
          class="mb-4"
        >
        </q-input>
        <q-btn
          outlined
          label="Save"
          class="mb-4 full-width flex justify-center"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>
