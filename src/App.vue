<script lang="ts" setup>
import DesktopNav from "./components/DesktopNav.vue";
import Loading from "./components/Loading.vue";
import { auth } from "./firebase";
import { useUIStore } from "./stores/ui";
import { useUserStore } from "./stores/user";
import { onAuthStateChanged } from "firebase/auth";

const ui = useUIStore();
const userStore = useUserStore();

onAuthStateChanged(auth, async(user) => {
  ui.isLoggedIn = !!user;
  userStore.user = user;
  if (user) {
    userStore.userData = await userStore.getUser(user);
  }
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
