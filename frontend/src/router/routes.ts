import { RouteRecordRaw } from 'vue-router';

import LoginPage from 'src/pages/LoginPage.vue';
import SignupPage from 'src/pages/SignupPage.vue';
import ForgotPasswordPage from 'src/pages/ForgotPasswordPage.vue';
import ResetPasswordConfirmPage from 'src/pages/ResetPasswordConfirmPage.vue';
import ChannelMessagePage from 'src/pages/ChannelMessagePage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  { path: '/home', redirect: '/' },

  // auth
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/forgot-password', component: ForgotPasswordPage },
  {
    path: '/password-reset',
    redirect: '/password-reset/request',
    children: [
      {
        path: 'request',
        component: ForgotPasswordPage,
        props: { isResetPassword: true },
      },
      { path: 'confirm', component: ResetPasswordConfirmPage },
    ],
  },

  // chats
  { path: '/channel', component: ChannelMessagePage },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
