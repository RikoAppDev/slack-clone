<template>
  <!--  Main Content  -->
  <div class="q-pa-md flex flex-center window-height">
    <div class="q-pa-md q-ma-sm q-col-grow q-col-auto" style="max-width: 560px">
      <h1 class="text-h4 q-mb-md">Reset Password</h1>
      <q-form @submit="onSubmit">
        <q-input
          outlined
          v-model="password"
          label="New Password"
          :type="showPassword ? 'text' : 'password'"
          class="q-mb-sm"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              @click="togglePasswordVisibility"
              class="cursor-pointer"
            />
          </template>
        </q-input>
        <p class="text-caption q-mb-md">
          It must be a combination of minimum 8 letters, numbers, and symbols.
        </p>
        <q-input
          outlined
          v-model="passwordRepeated"
          label="New Password Repeated"
          :type="showPassword ? 'text' : 'password'"
          class="q-mb-md"
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
          class="full-width q-py-sm text-body1 font-medium rounded"
          style="height: 3.5rem"
        />
      </q-form>
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

async function onSubmit() {
  // Handle form submission
}
</script>
