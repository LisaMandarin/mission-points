<script setup lang="ts">
import type { MissionType } from '../types';
defineProps<{
    missions: MissionType[]
}>()
</script>

<template>
    <table class="w-full border-2 border-blue md:text-2xl">
            <thead class="bg-blue text-white">
                <tr>
                    <th class="p-2">Mission</th>
                    <th class="p-2">Points</th>
                    <th class="p-2">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="mission in missions">
                    <td class="text-center p-2">{{ mission.name }}</td>
                    <td class="text-center p-2">{{ mission.points }}</td>
                    <td class="text-center p-2"><button>Apply</button></td>
                </tr>
            </tbody>
        </table>
</template>