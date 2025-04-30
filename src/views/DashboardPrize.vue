<script setup lang="ts">
import ParentPrizeList from '../components/ParentPrizeList.vue';
import ChildPrizeList from '../components/ChildPrizeList.vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
</script>

<template>
    <div class="w-[300px] md:w-[600px] mx-auto">
        <h1 class="text-center text-4xl">Prize List</h1>
        
        <template v-if="userStore.userData?.role === 'parent'">
            <ParentPrizeList />
        </template>
        <template v-else-if="userStore.userData?.role === 'child'">
            <ChildPrizeList />
        </template>
    </div>

    <div class="w-[300px] md:w-[600px] mx-auto">
        <h1 class="text-center text-4xl">Prize Redemption History</h1>
    </div>
</template>