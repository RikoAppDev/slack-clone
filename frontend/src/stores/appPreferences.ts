import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppPreferencesStore = defineStore('appPreferences', () => {
  const leftDrawerOpen = ref<boolean>(
    JSON.parse(localStorage.getItem('leftDrawerOpen') || 'true')
  );

  const toggleLeftDrawer = (): void => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
    localStorage.setItem(
      'leftDrawerOpen',
      JSON.stringify(leftDrawerOpen.value)
    );
  };

  return {
    leftDrawerOpen,
    toggleLeftDrawer,
  };
});
