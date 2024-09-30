<template>
  <!-- Visibility settings -->
  <q-btn-dropdown
    unelevated

    color="primary"
    :label="name"
  >
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <div class="text-h6 q-mb-md"></div>
        <q-option-group
          :options="options"
          type="radio"
          v-model="group"
        />
      </div>

      <q-separator vertical inset class="q-mx-lg"/>

      <div class="column items-center">

        <div class="text-subtitle1 q-mt-md q-mb-xs">
          {{ name }}
        </div>

        <q-btn
          color="primary"
          label="Logout"
          push
          size="sm"
          v-close-popup
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
  imgUrl: {
    type: String,
    required: true,
  },
});

const group = ref(null)

const options = [
  { label: 'Online', value: 'online', color: 'green' },
  { label: 'Invisible', value: 'invisible', color: 'grey' },
  { label: 'Offline', value: 'offline', color: 'red' }
]

</script>

<style scoped>
.profile-image {
  border-radius: 50%;
  transition: border-radius 150ms ease-in-out;
}

.profile-wrapper:hover .profile-image {
  border-radius: 10px;
}
</style>
