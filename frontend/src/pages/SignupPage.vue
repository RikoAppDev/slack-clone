<template>
  <!--  Main Content  -->
  <div class="q-pa-md flex flex-center window-height">
    <div class="q-pa-md q-col-grow q-col-auto" style="max-width: 560px">
      <h1 class="text-h4 q-mb-md">Sign Up</h1>
      <q-form @submit="onSubmit">
        <div class="row q-mb-md" style="gap: 8px">
          <q-input
            outlined
            v-model="firstname"
            label="First Name"
            type="text"
            name="profileName"
            class="col"
          />
          <q-input
            outlined
            v-model="lastname"
            label="Last Name"
            type="text"
            name="profileName"
            class="col"
          />
        </div>
        <q-input
          outlined
          v-model="username"
          label="Username"
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
import { useQuasar } from 'quasar';
import {
  validateEmail,
  validatePassword,
  validateSignupFormInput,
  validateTermsAndConditions,
} from '../utils/authValidation';
import { useUserStore } from '../stores/user';

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();

const firstname = ref('Riko');
const lastname = ref('Duvi');
const username = ref('rikoduvi');
const email = ref('test@gmail.com');
const password = ref('Heslo:123');
const passwordRepeated = ref('Heslo:123');
const showPassword = ref(false);
const rememberMe = ref(false);
const termsAccepted = ref(true);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = async () => {
  const formError = validateSignupFormInput(
    firstname.value,
    lastname.value,
    username.value,
    email.value,
    password.value
  );
  const emailError = validateEmail(email.value);
  const passwordError = validatePassword(
    true,
    password.value,
    passwordRepeated.value
  );
  const termsAndConditionsError = validateTermsAndConditions(
    termsAccepted.value
  );

  if (formError || emailError || passwordError || termsAndConditionsError) {
    $q.notify({
      type: 'negative',
      message:
        formError || emailError || passwordError || termsAndConditionsError,
      position: 'top',
    });
    return;
  }

  try {
    await userStore.signup({
      firstname: firstname.value,
      lastname: lastname.value,
      username: username.value,
      email: email.value,
      password: password.value,
    });

    $q.notify({
      type: 'positive',
      message: 'Signup successful',
      position: 'top',
    });
    await router.push('/');
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'An error occurred',
      position: 'top',
    });
  }
};
</script>
