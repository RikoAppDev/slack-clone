<template>
  <div class="group">
    <!-- Button Wrapper -->
    <button
      class="size-14 flex items-center justify-center transition-all bg-white duration-300 ease-in-out shadow-md rounded-[50%] group-hover:rounded-[10px]"
    >
      <!-- Image with Smooth Transition -->
      <img
        :src="imgUrl"
        :alt="name + ' Channel Image'"
        class="transition-all duration-300 ease-in-out rounded-[50%] group-hover:rounded-[10px]"
      />
    </button>
  </div>

  <div
    class="absolute left-14 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out bg-gray-800 text-white text-sm rounded-lg px-4 py-2 shadow-lg"
  >
    {{ name }}
  </div>
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
