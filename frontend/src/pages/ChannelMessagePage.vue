<script setup lang="ts">
import ChatScrollComponent from 'components/ChatScrollComponent.vue';
import ChatTextFieldComponent from 'components/ChatTextFieldComponent.vue';
import { useChannelStore } from '../stores/channelStore';
import { useAppPreferencesStore } from '../stores/appPreferences';

const channelStore = useChannelStore();
const appPreferencesStore = useAppPreferencesStore();
</script>

<template>
  <q-page class="q-pa-none column wrapper">
    <!-- Chat Content Area -->
    <div
      class="chat-page full-width column"
      style="flex-grow: 1; overflow-y: auto"
      v-if="channelStore.getSelectedChannel()"
    >
      <div class="full-width q-pt-md" style="flex-grow: 1; overflow-y: auto">
        <ChatScrollComponent />
      </div>
    </div>

    <div v-else class="no-channel">
      <p class="no-channel-heading">
        Oh no! It looks like you are not a member of any channel
      </p>
      <p>
        Try to create your own channel click on plus button or join to someones
        community using
      </p>
      <code>/join channel_name [private]</code><span>&nbsp;</span>
    </div>

    <!-- Chat Input at the Bottom -->
    <div
      :class="
        appPreferencesStore.leftDrawerOpen
          ? 'chat-input sticky q-px-sm q-pb-sm bg-white q-pa-md'
          : 'chat-input closed-drawer sticky q-px-sm q-pb-sm bg-white q-pa-md'
      "
    >
      <ChatTextFieldComponent />
    </div>
  </q-page>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-rows: 1fr auto;
}

.chat-input {
  position: sticky;
  bottom: 0;
  z-index: 1;
  width: calc(100vw - 8px);
}

@media (min-width: 1024px) {
  .chat-input {
    width: calc(100vw - 248px);
  }

  .closed-drawer {
    width: calc(100vw - 8px);
  }
}

.no-channel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 2rem;
  font-size: 1rem;
  line-height: 2rem;
}

.no-channel-heading {
  font-size: 1.5rem;
  font-weight: bolder;
}
</style>
