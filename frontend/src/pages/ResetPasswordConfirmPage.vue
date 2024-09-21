<template>
  <div class="min-h-dvh grid" style="grid-template-rows: auto 1fr auto">
    <!--  Main Content  -->
    <div class="flex h-full justify-center items-center">
      <div class="flex flex-col p-8 sm:w-[560px] font-light">
        <h1 class="text-2xl sm:text-4xl font-medium mb-6 sm:mb-10">
          Reset Password
        </h1>
        <q-form @submit="onSubmit">
          <q-input
            outlined
            v-model="password"
            label="New Password"
            :type="showPassword ? 'text' : 'password'"
            class="mb-2"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="togglePasswordVisibility"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <p class="text-xs mb-4">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
          <q-input
            outlined
            v-model="passwordRepeated"
            label="New Password Repeated"
            :type="showPassword ? 'text' : 'password'"
            class="mb-4"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="togglePasswordVisibility"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <q-btn
            unelevated
            no-caps
            color="primary"
            label="Reset Password"
            type="submit"
            class="w-full py-4 text-base font-medium rounded"
          />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const password = ref('');
const passwordRepeated = ref('');
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

async function onSubmit() {}
</script>
