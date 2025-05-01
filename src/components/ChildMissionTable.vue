<script setup lang="ts">
import { addDoc, collection } from "firebase/firestore";
import { useUserStore } from "../stores/user";
import { db } from "../firebase";
import { message } from "ant-design-vue";
import { useUIStore } from "../stores/ui";
import { useHomeStore } from "../stores/home";

const userStore = useUserStore();
const ui = useUIStore();
const homeStore = useHomeStore();

const handleApply = async (missionID: string) => {
  ui.isLoading = true;
  try {
    if (!missionID) {
      console.error("Mission ID missing");
      return;
    }
    const homeID = userStore.userData?.homeID;
    const appliedBy = userStore.userData?.uid;
    const appliedAt = new Date();
    if (!homeID || !appliedBy) {
      console.error("Some data for application missing");
      return;
    }
    await addDoc(collection(db, "homes", homeID, "pointsApplication"), {
      missionID,
      appliedBy,
      appliedAt,
      approved: false,
    });
    message.success("Application sent");
  } catch (error) {
    console.error("Failed to apply for points");
    message.error("Failed to apply for points");
  } finally {
    ui.isLoading = false;
  }
};
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
      <tr v-for="mission in homeStore.missions" :key="mission.id" class="even:bg-amber-200">
        <td class="text-center p-2">{{ mission.name }}</td>
        <td class="text-center p-2">{{ mission.points }}</td>
        <td class="text-center p-2">
          <button
            :disabled="ui.isLoading"
            class="bg-orange text-white px-2 py-1 rounded-md text-base hover:text-blue cursor-pointer"
            @click="() => handleApply(mission.id)"
          >
            Apply
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
