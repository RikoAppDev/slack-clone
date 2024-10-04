<template>
  <!--  Main Content  -->
  <div class="q-pa-md flex flex-center window-height">
    <div class="q-pa-md q-col-grow q-col-auto" style="max-width: 560px">
      <h1 class="text-h4 q-mb-md">
        {{
          isResetPassword ? 'Reset your password' : 'Forgotten your password?'
        }}
      </h1>
      <p class="q-mb-md text-body">
        There is nothing to worry about, we'll send you a message to help you
        {{
          isResetPassword ? 'reset your password.' : 'retrieve your account.'
        }}
      </p>
      <q-form @submit="onSubmit">
        <q-input
          outlined
          v-model="email"
          label="Email Address"
          type="email"
          name="email"
          class="q-mb-md"
        />
        <q-btn
          unelevated
          no-caps
          color="primary"
          label="Send Reset Link"
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

defineProps({
  isResetPassword: {
    type: Boolean,
    default: false,
  },
});
const email = ref('');

const onSubmit = () => {
  // Handle the form submission for password reset
};
</script>
