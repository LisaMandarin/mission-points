<script setup lang="ts">
import { useHomeStore } from '../stores/home';

const homeStore = useHomeStore();
</script>

<template>
    <table class="w-[300px] md:w-[600px] border-2 border-blue">
        <thead class="bg-blue text-white">
            <tr>
                <th class="p-2">Prize</th>
                <th class="p-2">Cost</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="homeStore.prizes.length > 0" v-for="prize in homeStore.prizes">
                <td class="p-2 text-center">{{ prize.name }}</td>
                <td class="p-2 text-center">{{ prize.cost }}</td>
            </tr>
            <tr v-else>
                <td colspan="2" class="text-center">
                    You haven't had any prizes yet.
                </td>
            </tr>
        </tbody>
    </table>
</template>