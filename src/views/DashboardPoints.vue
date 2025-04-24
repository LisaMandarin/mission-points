<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import ChildMissionTable from "../components/ChildMissionTable.vue";
import ParentMissionTable from "../components/ParentMissionTable.vue";
import { useUserStore } from "../stores/user";
import type { MissionType } from "../types";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";

const missions = ref<MissionType[]>([]);
const userStore = useUserStore();
const userData = computed(() => userStore.userData);

async function fetchMissions(homeID: string) {
  if (!homeID) {
    console.error("Home ID needed to fetch missions");
  }
  onSnapshot(
    collection(db, "homes", homeID, "missions"),
    (query) => {
      missions.value = query.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          points: data.points,
        };
      });
    }
  );
}

watchEffect(() => {
  const homeID = userStore.userData?.homeID;
  if (homeID) {
      fetchMissions(homeID);
  }
});
</script>

<template>
  <div class="w-[300px] md:w-[600px] mx-auto py-4">
    <h1 class="text-center text-4xl">Mission List</h1>
    <template v-if="userData?.role === 'child'">
      <ChildMissionTable :missions="missions" />
    </template>
    <template
      v-else-if="userData?.role === 'parent' || userData?.role === 'other'"
    >
      <ParentMissionTable :missions="missions" />
    </template>
    <template v-else>
      <p class="text-red-600 text-center p-2 md:text-2xl">
        You have to set up profile first
      </p>
    </template>
  </div>
</template>
