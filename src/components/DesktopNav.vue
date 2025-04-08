<script setup lang="ts">
import { routes } from '../router';
import SignOutBtn from './SignOutBtn.vue';
import { useUIStore } from '../stores/ui';
import { computed } from 'vue';
const ui = useUIStore();
const visibleRoutes = computed(() => {
    return routes.filter((route) => {
        if (ui.isLoggedIn) {
            return route.name !== "Login" && route.name !== "Register"
        } else {
            return route.name !== "Dashboard"
        }
    })
})

</script>

<template>
    <div class="m-4">
        <span v-for="route in visibleRoutes" :key="route.path" class="px-2 text-lg md:text-2xl font-semibold hover:text-blue active:text-orange">
            <router-link :to="route.path">{{ route.name }}</router-link>        
        </span>
        <SignOutBtn />
    </div>
</template>