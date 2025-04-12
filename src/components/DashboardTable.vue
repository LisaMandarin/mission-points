<script setup lang="ts">
import type { UserDataType } from '../types';
import { BsHouse } from 'vue-icons-plus/bs';


const props = defineProps<{
    userData: UserDataType | null
}>()
</script>
<template>
    <table class="w-[300px] md:w-[600px] border-2 border-blue">
            <thead class="bg-blue text-white">
                <tr>
                    <th class="p-2 flex justify-center"><BsHouse /></th>
                    <th class="p-2">Name</th>
                    <th class="p-2">Role</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="props.userData">
                    <td class="text-center p-2">Me</td>
                    <td class="text-center p-2">{{ props.userData.name }}</td>
                    <td class="text-center p-2">{{ props.userData.role }}</td>
                </tr>
                <tr v-else>
                    <td>Me</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                </tr>
            </tbody>
        </table>
</template>