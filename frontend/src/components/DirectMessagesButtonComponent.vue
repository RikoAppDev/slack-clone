<template>
  <q-btn
    unelevated
    round
    size="18px"
    no-caps
    class="text-body1 bg-white dm-button"
  >
    DMs
  </q-btn>
  <q-tooltip
    anchor="center end"
    self="center start"
    transition-show="jump-right"
    transition-hide="jump-left"
    class="bg-grey-8 text-white text-body2 q-pa-sm"
  >
    Direct Messages
  </q-tooltip>
</template>

<script setup lang="ts"></script>

<style scoped>
.dm-button {
  border-radius: 50%;
  transition: border-radius 150ms ease-in-out;
}

.dm-button:hover {
  border-radius: 10px;
}
</style>
