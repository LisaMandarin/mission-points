<script setup lang="ts">
import 'animate.css'
import LandingBtn from "../components/LandingBtn.vue";
import { useUIStore } from '../stores/ui';
import { useUserStore} from '../stores/user'

const ui = useUIStore();
const userStore = useUserStore();
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full">
    <div class="xl:h-[150px]">
      <h1
        class="animate__animated animate__tada text-blue font-extrabold text-5xl xl:text-8xl font-title leading-24 text-center"
      >
        Mission Points
      </h1>
    </div>
    <div v-if="ui.isLoggedIn" class="text-2xl md:text-4xl">Welcome <span>{{ userStore.userData?.name }}</span></div>
    <div v-else class="flex flex-row w-full justify-center gap-4 h-[60px]">
      <LandingBtn name="Login" link="/login" />
      <LandingBtn name="Register" link="/register" />
    </div>
  </div>
</template>
