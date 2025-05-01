<script setup lang="ts">
import { computed } from "vue";
import { useHomeStore } from "../stores/home";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const homeStore = useHomeStore();
const totalPoints = computed(() => {
  const apps = homeStore.applicationsByUser.filter(
    (app) => app.approved === true
  );
  if (apps.length === 0) {
    return 0;
  }
  return apps.reduce((acc, app) => {
    return acc + (homeStore.missionMap[app.missionID]?.points || 0);
  }, 0);
});
</script>

<template>
  <table class="w-[300px] md:w-[600px] border-2 border-blue">
    <thead class="bg-blue text-white">
      <tr>
        <th class="p-2 flex justify-center items-center">Person</th>
        <th class="p-2">Total Points</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center p-2">
          {{ homeStore.familyMap[userStore.userData?.uid]?.name }}
        </td>
        <td class="text-center p-2">{{ totalPoints }}</td>
      </tr>
    </tbody>
  </table>
</template>
