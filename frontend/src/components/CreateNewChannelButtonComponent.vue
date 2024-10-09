<template>
  <q-btn
    unelevated
    size="18px"
    icon="add"
    no-caps
    class="text-body1 bg-white add-button full-width"
  />
  <q-tooltip
    anchor="center end"
    self="center start"
    transition-show="jump-right"
    transition-hide="jump-left"
    class="bg-grey-8 text-white text-body2 q-pa-sm"
  >
    Add a Channel
  </q-tooltip>
</template>

<script setup lang="ts"></script>

<style scoped>
.add-button {
  border-radius: 50px;
  transition: border-radius 150ms ease-in-out;
}

.add-button:hover {
  border-radius: 10px;
}
</style>
