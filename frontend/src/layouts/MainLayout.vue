<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          round
          size="18px"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>Phoenix</q-toolbar-title>
        <q-btn flat round aria-label="Profile" to="/profile">
          <ProfileButtonComponent
            :img-url="profile.imgUrl"
            :name="profile.name"
          />
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Drawer for Sidebar -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="true"
      :mini-width="72"
      class="q-pa-none bg-primary row justify-center items-start content-start hide-scrollbar"
    >
      <q-item class="flex flex-center">
        <DirectMessagesButtonComponent />
      </q-item>
      <div
        class="q-mb-sm bg-white rounded-borders"
        style="height: 2px; width: 54px"
      />
      <q-list class="q-col-gutter-none">
        <q-item
          v-for="(channel, index) in channels"
          :key="index"
          class="q-my-none"
        >
          <ChannelButtonComponent
            :name="channel.name"
            :imgUrl="channel.imgUrl"
            :link="channel.link"
          />
        </q-item>
        <q-item>
          <CreateNewChannelButtonComponent />
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Main Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChannelButtonComponent from 'components/ChannelButtonComponent.vue';
import DirectMessagesButtonComponent from 'components/DirectMessagesButtonComponent.vue';
import CreateNewChannelButtonComponent from 'components/CreateNewChannelButtonComponent.vue';
import ProfileButtonComponent from 'components/ProfileButtonComponent.vue';

const leftDrawerOpen = ref<boolean>(false);

const toggleLeftDrawer = (): void => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

interface Profile {
  name: string;
  imgUrl: string;
}

const profile: Profile = {
  name: 'Janko Hrasko',
  imgUrl: 'https://picsum.photos/100?random=0',
};

interface Channel {
  name: string;
  imgUrl: string;
  link: string;
}

const channels: Channel[] = [
  {
    name: 'General',
    imgUrl: 'https://picsum.photos/100?random=1',
    link: '/',
  },
  {
    name: 'Development',
    imgUrl: 'https://picsum.photos/100?random=2',
    link: '/',
  },
  {
    name: 'Design',
    imgUrl: 'https://picsum.photos/100?random=3',
    link: '/',
  },
  {
    name: 'Marketing',
    imgUrl: 'https://picsum.photos/100?random=4',
    link: '/',
  },
  {
    name: 'General',
    imgUrl: 'https://picsum.photos/100?random=5',
    link: '/',
  },
  {
    name: 'Development',
    imgUrl: 'https://picsum.photos/100?random=6',
    link: '/',
  },
  {
    name: 'Design',
    imgUrl: 'https://picsum.photos/100?random=7',
    link: '/',
  },
  {
    name: 'Marketing',
    imgUrl: 'https://picsum.photos/100?random=8',
    link: '/',
  },
  {
    name: 'General',
    imgUrl: 'https://picsum.photos/100?random=9',
    link: '/',
  },
  {
    name: 'Development',
    imgUrl: 'https://picsum.photos/100?random=10',
    link: '/',
  },
  {
    name: 'Design',
    imgUrl: 'https://picsum.photos/100?random=11',
    link: '/',
  },
  {
    name: 'Marketing',
    imgUrl: 'https://picsum.photos/100?random=12',
    link: '/',
  },
];
</script>

<style>
.q-toolbar {
  height: 4.45rem;
}
</style>
