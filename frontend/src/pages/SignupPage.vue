<template>
  <!--  Main Content  -->
  <div class="flex h-dvh justify-center items-center">
    <div class="flex flex-col p-8 sm:w-[560px] font-light">
      <h1 class="text-2xl sm:text-4xl font-medium mb-6 sm:mb-10">Sign Up</h1>
      <q-form @submit="onSubmit">
        <q-input
          outlined
          v-model="profileName"
          label="Profile Name"
          type="text"
          name="profileName"
          class="mb-4"
        />
        <q-input
          outlined
          v-model="email"
          label="Email Address"
          type="email"
          name="email"
          class="mb-4"
        />
        <q-input
          outlined
          v-model="password"
          label="Password"
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
          label="Password Repeated"
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
        <q-checkbox
          v-model="termsAccepted"
          label="Accept terms and conditions"
        />
        <div class="flex items-center justify-between mb-4">
          <q-checkbox v-model="rememberMe" label="Remember me" />
          <router-link to="/forgot-password" class="text-primary"
            >Forgot Password?
          </router-link>
        </div>
        <q-btn
          unelevated
          no-caps
          color="primary"
          label="Sign Up"
          type="submit"
          class="w-full py-4 text-base font-medium rounded"
        />
      </q-form>
      <span class="h-[2px] w-full bg-neutral-200 mt-8 rounded"></span>
      <p class="text-gray-600 mt-2">
        Already have an account?
        <router-link to="/login" class="text-primary">Log In</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileName: '',
      email: '',
      password: '',
      passwordRepeated: '',
      showPassword: false,
      rememberMe: false,
      termsAccepted: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async onSubmit() {},
  },
};
</script>
