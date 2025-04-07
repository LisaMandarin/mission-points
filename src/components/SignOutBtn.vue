<script setup lang="ts">
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUIStore } from '../stores/ui';

const isLoggedIn = ref(true);
const router = useRouter();
const auth = getAuth();
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
    class="px-2 text-lg font-semibold hover:text-blue active:text-orange cursor-pointer"
  >
    Sign Out
  </button>
</template>
