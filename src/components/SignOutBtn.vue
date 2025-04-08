<script setup lang="ts">
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUIStore } from '../stores/ui';
import { auth } from '../firebase';

const isLoggedIn = ref(true);
const router = useRouter();
const ui = useUIStore();

const handleSignOut = () => {
    ui.isLoading = true;
    signOut(auth).then(() => {
        router.push('/');
    }).catch((error) => {
        console.error("Error signing out: ", error);
    }).finally(() => {
        ui.isLoading = false;
    });
}

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;
        }
    })
})
</script>

<template>
  <button
    v-if="isLoggedIn"
    @click="handleSignOut"
    class="px-2 text-lg md:text-2xl font-semibold hover:text-blue active:text-orange cursor-pointer"
  >
    Sign Out
  </button>
</template>
