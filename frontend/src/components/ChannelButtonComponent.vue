<template>
  <q-btn
    unelevated
    round
    size="18px"
    class="image-wrapper relative-position bg-white"
    :to="link"
  >
    <span v-if="private" class="lock">🔒</span>
    <q-img
      :src="imgUrl"
      :alt="name + ' Channel Image'"
      class="image-content full-width full-height"
    />
  </q-btn>

  <q-tooltip
    anchor="center end"
    self="center start"
    transition-show="jump-right"
    transition-hide="jump-left"
    class="bg-grey-8 text-white text-body2 q-pa-sm"
  >
    {{ private ? `🔒: ${name}` : `🔓: ${name}` }}
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
  link: {
    type: String,
    required: true,
  },
  private: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.image-content {
  border-radius: 50%;
  transition: border-radius 150ms ease-in-out;
}

.image-wrapper:hover .image-content {
  border-radius: 10px;
}

.q-img__loading .q-spinner {
  font-size: 20px;
  color: white;
}

.lock {
  position: absolute;
  z-index: 10;
  right: 0;
  top: 0;
  font-size: 1rem;
  width: 1.8rem;
  background: #ff5a5f;
  border-radius: 50%;
  translate: 20% -20%;
}
</style>
