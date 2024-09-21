<script setup lang="ts">
import { ref } from 'vue';

const userProfile = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: '',
  bio: 'Software Developer at XYZ',
});

const updateProfile = () => {
  // Logic to update the profile
  console.log('Profile updated', userProfile.value);
};

const logout = () => {
  // Logic for logging out
  console.log('User logged out');
};
</script>

<template>
  <div class="profile-page flex flex-col items-center p-6">
    <div class="profile-container bg-white shadow-lg rounded-lg p-4 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Edit Profile</h2>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" v-model="userProfile.name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" v-model="userProfile.email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" v-model="userProfile.password" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Bio</label>
        <textarea v-model="userProfile.bio" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" rows="3"></textarea>
      </div>
      <div class="mt-6 flex justify-between">
        <q-btn label="Save Changes" color="primary" @click="updateProfile" />
        <q-btn label="Log Out" color="negative" @click="logout" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  background-color: #f7fafc; /* Tailwind's gray-100 */
}
</style>
