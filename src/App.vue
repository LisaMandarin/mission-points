<script lang="ts" setup>
import DesktopNav from "./components/DesktopNav.vue";
import Loading from "./components/Loading.vue";
import { useUIStore } from "./stores/ui";
import { useUserStore } from "./stores/user";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const ui = useUIStore();
const userStore = useUserStore();
onAuthStateChanged(getAuth(), (user) => {
  ui.isLoggedIn = !!user;
  userStore.user = user;
});
</script>

<template>
  <div class="bg-beige flex flex-col h-screen font-body">
    <DesktopNav />
    <div class="relative flex-grow">
      <Loading :loading="ui.isLoading" />

      <router-view />
    </div>
  </div>
</template>
