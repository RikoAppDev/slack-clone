<template>
  <!--  Main Content  -->
  <div class="q-pa-md flex flex-center window-height">
    <div class="q-pa-md q-ma-sm q-col-grow q-col-auto" style="max-width: 560px">
      <h1 class="text-h4 q-mb-md">Sign Up</h1>
      <q-form @submit="onSubmit">
        <q-input
          outlined
          v-model="profileName"
          label="Profile Name"
          type="text"
          name="profileName"
          class="q-mb-md"
        />
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
        <q-input
          outlined
          v-model="passwordRepeated"
          label="Password Repeated"
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
        <q-checkbox
          v-model="termsAccepted"
          label="Accept terms and conditions"
          class="q-mb-sm"
        />
        <div class="row items-center justify-between q-mb-md">
          <q-checkbox v-model="rememberMe" label="Remember me" />
          <router-link to="/forgot-password" class="text-primary">
            Forgot Password?
          </router-link>
        </div>
        <q-btn
          unelevated
          no-caps
          color="primary"
          label="Sign Up"
          type="submit"
          class="full-width q-py-sm text-body1 font-medium rounded"
          style="height: 3.5rem"
        />
      </q-form>
      <q-separator class="q-mt-md rounded-borders" />
      <p class="q-mt-sm">
        Already have an account?
        <router-link to="/login" class="text-primary">Log In</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const profileName = ref('');
const email = ref('');
const password = ref('');
const passwordRepeated = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);
const termsAccepted = ref(false);

const router = useRouter();

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = async () => {
  // TODO: Handle form submit logic
  await router.push('/');
};
</script>
