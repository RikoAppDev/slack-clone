<template>
  <q-btn unelevated round size="18px" class="profile-wrapper">
    <q-img :src="imgUrl" :alt="name + ' Profile Image'" class="profile-image" />
  </q-btn>
  <q-tooltip
    anchor="center start"
    self="center end"
    transition-show="jump-left"
    transition-hide="jump-right"
    class="bg-grey-8 text-white text-body2 q-pa-sm"
  >
    {{ name }}
  </q-tooltip>
</template>

<script setup lang="ts">
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
