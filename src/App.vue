<script lang="ts" setup>
import DesktopNav from './components/DesktopNav.vue';
import { useUIStore } from './stores/ui';
import Loading from './components/Loading.vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const ui = useUIStore();
onAuthStateChanged(getAuth(), (user) => {
  ui.isLoggedIn = !!user
})
</script>

<template>
  <div class="bg-beige flex flex-col h-screen">
    <Desktop-nav />
    <div class="relative flex-grow">
      
        <Loading :loading="ui.isLoading"/>
      
      <router-view />
    </div>
  </div>
</template>
