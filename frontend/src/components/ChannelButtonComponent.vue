<template>
  <q-btn
    unelevated
    size="18px"
    :to="link"
    no-caps
    class="wrapper full-width row content-start"
  >
    <p class="text-body2">
      {{ private ? `🔒: ${name}` : `🔓: ${name}` }}
    </p>
  </q-btn>
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
.wrapper {
  border-radius: 50px;
  transition: border-radius 150ms ease-in-out;
}

.wrapper:hover {
  border-radius: 10px;
}

p {
  margin: 0;
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
