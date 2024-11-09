import { RouteRecordRaw } from 'vue-router';

import ForgotPasswordPage from 'src/pages/ForgotPasswordPage.vue';
import { useUserStore } from '../stores/user';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (!userStore.isAuthenticated) {
        next('/login'); // Redirect to login if not authenticated
      } else {
        next();
      }
    },
    children: [
      {
        path: '',
        component: () => import('pages/ChannelMessagePage.vue'),
      },
    ],
  },

  { path: '/home', redirect: '/' },

  // auth
  { path: '/login', component: () => import('pages/LoginPage.vue') },
  { path: '/signup', component: () => import('pages/SignupPage.vue') },
  {
    path: '/forgot-password',
    component: () => import('pages/ForgotPasswordPage.vue'),
  },
  {
    path: '/password-reset',
    redirect: '/password-reset/request',
    children: [
      {
        path: 'request',
        component: ForgotPasswordPage,
        props: { isResetPassword: true },
      },
      {
        path: 'confirm',
        component: () => import('pages/ResetPasswordConfirmPage.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
