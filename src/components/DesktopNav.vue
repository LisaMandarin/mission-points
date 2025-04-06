<script setup lang="ts">
import { routes } from '../router';
import SignOutBtn from './SignOutBtn.vue';
</script>

<template>
    <div class="m-4">
        <span v-for="route in routes" :key="route.path" class="px-2 text-lg font-semibold hover:text-blue active:text-orange">
            <router-link :to="route.path">{{ route.name }}</router-link>        
        </span>
        <SignOutBtn />
    </div>
</template>