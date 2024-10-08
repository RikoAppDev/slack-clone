<script setup lang="ts">
import { ref } from 'vue';
import { useChannelStore } from '../stores/channelStore';
import ChannelButtonComponent from 'components/ChannelButtonComponent.vue';
import DirectMessagesButtonComponent from 'components/DirectMessagesButtonComponent.vue';
import CreateNewChannelButtonComponent from 'components/CreateNewChannelButtonComponent.vue';
import ProfileButtonComponent from 'components/ProfileButtonComponent.vue';

const leftDrawerOpen = ref<boolean>(false);
const toggleLeftDrawer = (): void => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const channelStore = useChannelStore();

interface Profile {
  name: string;
  tag: string;
  imgUrl: string;
}

const profile: Profile = {
  name: 'Janko Hrasko',
  tag: '@janik_na_hrasku',
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
          :tag="profile.tag"
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
      <q-item class="flex flex-center">
        <DirectMessagesButtonComponent />
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
            :link="channel.link"
            :private="channel.private"
            @click="channelStore.selectChannel(channel)"
          />
        </q-item>
      </q-list>
      <q-item>
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
  display: flex;
  flex-direction: column;
  align-items: start;
  border-right: 2px #ff5a5f solid;
}

.divider {
  width: 80%;
  height: 2px;
}
</style>
