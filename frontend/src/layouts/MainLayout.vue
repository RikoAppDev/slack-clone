<script setup lang="ts">
import { ref } from 'vue';
import { useChannelStore } from '../stores/channelStore';
import ChannelButtonComponent from 'components/ChannelButtonComponent.vue';
import CreateNewChannelButtonComponent from 'components/CreateNewChannelButtonComponent.vue';
import ProfileButtonComponent from 'components/ProfileButtonComponent.vue';

const leftDrawerOpen = ref<boolean>(false);
const toggleLeftDrawer = (): void => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const channelStore = useChannelStore();

interface Profile {
  name: string;
  nickname: string;
  imgUrl: string;
}

const profile: Profile = {
  name: 'Janko Hrasko',
  nickname: '@janik_na_hrasku',
  imgUrl: 'https://picsum.photos/100?random=0',
};
</script>

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
        <q-toolbar-title>Riso&Riko co.</q-toolbar-title>
        <ProfileButtonComponent
          :img-url="profile.imgUrl"
          :name="profile.name"
          :nickname="profile.nickname"
        />
      </q-toolbar>
    </q-header>

    <!-- Drawer for Sidebar -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="drawer"
      :width="240"
    >
      <q-item class="flex flex-center q-pa-none">
        <p class="channel">Channels</p>
      </q-item>
      <div class="q-mb-sm bg-primary rounded-borders divider self-center" />
      <q-list class="q-col-gutter-none full-width">
        <q-item
          v-for="(channel, index) in channelStore.channels"
          :key="index"
          class="q-my-none q-px-xs q-pb-none"
        >
          <ChannelButtonComponent
            :name="channel.name"
            :private="channel.private"
            :isSelected="channel == channelStore.selectedChannel"
            @click="channelStore.selectChannel(channel)"
          />
        </q-item>
      </q-list>
      <q-item class="q-my-none q-pa-none q-px-xs full-width">
        <CreateNewChannelButtonComponent />
      </q-item>
    </q-drawer>

    <!-- Main Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.q-toolbar {
  height: 4.45rem;
}

.drawer {
  display: grid;
  grid-template-rows: min-content min-content min-content min-content;
  justify-items: center;
  align-items: start;
  border-right: 2px #ff5a5f solid;
  padding-bottom: 10px;
}

.channel {
  width: 100%;
  margin: unset;
  padding: 22px 24px;
  font-size: 18px;
}

.divider {
  width: 80%;
  height: 2px;

  transform: translateY(-50%);
}
</style>
