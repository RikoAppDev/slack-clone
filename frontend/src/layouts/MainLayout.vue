<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar class="h-20">
        <q-btn
          flat
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>Just Better Slack</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Drawer for Sidebar -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="true"
      :mini-width="80"
      class="shadow-lg bg-primary"
    >
      <q-item class="h-20 flex justify-center items-center">
        <DirectMessagesButtonComponent />
      </q-item>
      <div class="h-0.5 mb-2 bg-white mx-2 rounded" />
      <q-list>
        <q-item
          v-for="(channel, index) in channels"
          :key="index"
          class="flex items-center justify-center"
        >
          <ChannelButtonComponent
            :name="channel.name"
            :imgUrl="channel.imgUrl"
          />
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

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const channels = [
  {
    name: 'General',
    imgUrl: 'https://picsum.photos/100?random=1',
  },
  {
    name: 'Development',
    imgUrl: 'https://picsum.photos/100?random=2',
  },
  {
    name: 'Design',
    imgUrl: 'https://picsum.photos/100?random=3',
  },
  {
    name: 'Marketing',
    imgUrl: 'https://picsum.photos/100?random=4',
  },
];
</script>
