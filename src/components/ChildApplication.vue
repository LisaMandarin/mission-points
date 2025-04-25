<script setup lang="ts">
import { useHomeStore } from '../stores/home';
import formatTime from '../utils/formatTime';
import { IpReturn } from 'vue-icons-plus/ip';

const homeStore = useHomeStore();
</script>

<template>
    <table class="applicaton w-full border-2 border-blue md:text-2xl">
        <thead class="bg-blue text-white">
            <tr class="align-top">
                <th class="px-2">Mission</th>
                <th class="px-2">Approved By</th>
                <th class="px-2">Status</th>
                <th class="px-2">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="homeStore.applicationsByUser" v-for="application in homeStore.applicationsByUser" :key="application.id" class="even:bg-amber-200">
                <td class="text-center">
                    <div>
                        <p class="font-semibold">{{ homeStore.missionMap[application.missionID].name }}</p>
                        <p class="text-xs md:text-base">{{ application.appliedAt ? formatTime(application.appliedAt) : "" }}</p>
                    </div>
                </td>
                <td class="text-center">{{ application.approvedBy ?  homeStore.familyMap[application.approvedBy].name : "N/A" }}</td>
                <td class="text-center"><span :class="`badge ${application.approved ?'badge-success' : 'badge-warning'}`">{{ application.approved ? "approved" : "pending"}}</span></td>
                <td class="text-center">
                    <button class="bg-orange text-white px-2 py-1 rounded-md text-base hover:text-blue cursor-pointer">
                        <IpReturn class="inline-block"/>
                    </button>
                </td>
            </tr>
            <tr v-else>
                <td colspan="4">No applications yet</td>
            </tr>
        </tbody>
    </table>
</template>