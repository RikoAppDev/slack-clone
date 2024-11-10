import { boot } from 'quasar/wrappers';
import { useUserStore } from '../stores/user';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async () => {
  const userStore = useUserStore();
  await userStore.checkAuth();
});
