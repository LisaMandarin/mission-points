<script setup lang="ts">
import { routes } from "../router";
import SignOutBtn from "./SignOutBtn.vue";
import { useUIStore } from "../stores/ui";
import { useUserStore } from "../stores/user";
import { computed, ref } from "vue";

const ui = useUIStore();
const userStore = useUserStore();
const warningMsg = ref("");
const visibleRoutes = computed(() => {
  return routes.filter((route) => {
    if (ui.isLoggedIn && userStore.userData!== null) {
      warningMsg.value = "";
      return route.name !== "Login" && route.name !== "Register";
    } else if (ui.isLoggedIn && userStore.userData === null) {
      warningMsg.value = "Please register to set up everything!!";
      return route.name === "Register";
    } else {
      warningMsg.value = "";
      return route.name !== "Dashboard";
    }
  });
});
</script>

<template>
  <div class="m-4 flex">
    <div class="flex-grow">
      <span
        v-for="route in visibleRoutes"
        :key="route.path"
        class="px-2 text-lg md:text-2xl font-semibold hover:text-blue active:text-orange"
      >
        <router-link :to="route.path">{{ route.name }}</router-link>
      </span>
      <span
        v-if="warningMsg"
        class="text-red-600 animate__animated animate__flash animate__infinite infinite"
        >{{ warningMsg }}</span
      >
    </div>
    <div>
      <SignOutBtn />
    </div>
  </div>
</template>
