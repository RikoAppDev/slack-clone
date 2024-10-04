<template>
  <!--  Main Content  -->
  <div class="q-pa-md flex flex-center window-height">
    <div class="q-pa-md q-col-grow q-col-auto">
      <h1 class="text-h4 q-mb-md">Log In</h1>
      <q-form @submit="onSubmit">
        <q-input
          outlined
          v-model="email"
          label="Email Address"
          type="email"
          name="email"
          class="q-mb-md"
        />
        <q-input
          outlined
          v-model="password"
          label="Password"
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
        <div class="row items-center justify-between q-mb-md">
          <q-checkbox v-model="rememberMe" label="Remember me" />
          <router-link to="/forgot-password" class="text-primary under">
            Forgot Password?
          </router-link>
        </div>
        <q-btn
          unelevated
          no-caps
          color="primary"
          label="Log In"
          type="submit"
          class="full-width q-py-sm text-body1 font-medium"
          style="height: 3.5rem"
        />
      </q-form>
      <q-separator class="q-mt-md rounded-borders" />
      <p class="q-mt-sm">
        No account yet?
        <router-link to="/signup" class="text-primary">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import {
  validateEmail,
  validateLoginFormInput,
  validatePassword,
} from '../utils/authValidation';
import { useUserStore } from '../stores/user';

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = async () => {
  const formError = validateLoginFormInput(email.value, password.value);
  const emailError = validateEmail(email.value);
  const passwordError = validatePassword(false, password.value);

  if (formError || emailError || passwordError) {
    $q.notify({
      type: 'negative',
      message: formError || emailError || passwordError,
      position: 'top',
    });
    return;
  }
  // TODO: Handle form submit logic
  try {
    await userStore.login({
      email: email.value,
      password: password.value,
    });

    $q.notify({
      type: 'positive',
      message: 'Login successful',
      position: 'top',
    });
    await router.push('/');
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'An error occurred',
      position: 'top',
    });
  }
};
</script>
