<script setup lang="ts">
import { useHomeStore } from '../stores/home';

const homeStore = useHomeStore();

const handleApply = () => {
    console.log('Application sent')
}
</script>


<template>
    <table class="w-[300px] md:w-[600px] border-2 border-blue">
        <thead class="bg-blue text-white">
            <tr>
                <th class="p-2">Prize</th>
                <th class="p-2">Cost</th>
                <th class="p-2">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="homeStore.prizes.length > 0" v-for="prize in homeStore.prizes">
                <td class="p-2 text-center">{{ prize.name }}</td>
                <td class="p-2 text-center">{{ prize.cost }}</td>
                <td class="p-2 text-center">
                    <button @click="handleApply" class="cursor-pointer bg-orange text-white px-2 py-1 rounded-md hover:text-blue">Apply</button>
                </td>
            </tr>
            <tr v-else>
                <td colspan="3" class="text-center">
                    You haven't had any prizes yet.
                </td>
            </tr>
        </tbody>
    </table>
</template>