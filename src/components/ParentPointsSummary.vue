<script setup lang="ts">
import { computed } from "vue";
import { useHomeStore } from "../stores/home";

const homeStore = useHomeStore();
const pointsByMembers = computed(() => {
  const result: Record<string, any> = {};
  homeStore.filteredMembers.forEach((member) => {
    const appsByMember = homeStore.applications.filter(
      (app) => app.appliedBy === member.id && app.redeemed === false && app.approved == true
    );
    const totalPoints = appsByMember.reduce((acc, app) => {
      return acc + (homeStore.missionMap[app.missionID]?.points || 0);
    }, 0);
    result[member.id] = totalPoints;
  });
  return result;
});
</script>

<template>
  <table class="w-[300px] md:w-[600px] border-2 border-blue">
    <thead class="bg-blue text-white">
      <tr>
        <th class="p-2 flex justify-center items-center">Child</th>
        <th class="p-2">Total Points</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-if="homeStore.filteredMembers.length > 0"
        v-for="member in homeStore.filteredMembers"
        :key="member.id"
      >
        <td class="text-center p-2">
          {{ homeStore.familyMap[member.id].name }}
        </td>
        <td class="text-center p-2">{{ pointsByMembers[member.id] }}</td>
      </tr>
      <tr v-else>
        <td colspan="2" class="text-center p-2">
          You don't have family members yet.
        </td>
      </tr>
    </tbody>
  </table>
</template>
