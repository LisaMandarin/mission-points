<script setup lang="ts">
import ParentPrizeList from '../components/ParentPrizeList.vue';
import ChildPrizeList from '../components/ChildPrizeList.vue';
import ParentRedemption from '../components/ParentRedemption.vue';
import ChildRedemption from '../components/ChildRedemption.vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
</script>

<template>
    <div class="w-[300px] md:w-[600px] mx-auto">
        <h1 class="text-center text-4xl">Prize List</h1>
        
        <template v-if="userStore.userData?.role === 'parent' || userStore.userData?.role === 'other'">
            <ParentPrizeList />
        </template>
        <template v-else-if="userStore.userData?.role === 'child'">
            <ChildPrizeList />
        </template>
    </div>

    <div class="w-[300px] md:w-[600px] mx-auto">
        <h1 class="text-center text-4xl">Prize Redemption History</h1>
        <template v-if="userStore.userData?.role ==='parent' || userStore.userData?.role === 'other'">
            <ParentRedemption />
        </template>
        <template v-else-if="userStore.userData?.role === 'child'">
            <ChildRedemption />
        </template>
    </div>
</template>