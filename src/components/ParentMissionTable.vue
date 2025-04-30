<script setup lang="ts">
import { MdOutlineAddCircleOutline } from "vue-icons-plus/md";
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { useUserStore } from "../stores/user";
import { db } from "../firebase";
import { useUIStore } from "../stores/ui";
import { useHomeStore } from "../stores/home";
import { DownOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

const userStore = useUserStore();
const ui = useUIStore();
const homeStore = useHomeStore();
const newMission = ref<string>("");
const newPoints = ref<number>();

const handleAddMission = async (e: Event) => {
  e.preventDefault();

  ui.isLoading = true;
  const homeID = userStore.userData?.homeID;

  if (!homeID) {
    console.error(
      "What's your home ID?  You can't add a mission without a home ID."
    );
    ui.isLoading = false;
    return;
  }

  if (!newMission.value || !newPoints.value) {
    console.error("You have to add mission name and points before adding it.");
    ui.isLoading = false;
    return;
  }

  try {
    await addDoc(collection(db, "homes", homeID, "missions"), {
      name: newMission.value,
      points: newPoints.value,
      createdAt: new Date(),
    });

    newMission.value = "";
    newPoints.value = 0;
  } catch (error) {
    console.error("Failed to add a mission: ", error);
  } finally {
    ui.isLoading = false;
  }
};

const handleGrant = async (missionID: string, userID: string) => {
  ui.isLoading = true;
  try {
    if (!missionID || !userID) throw new Error("Missing missionID or userID");

    const homeID = homeStore.homeID;
    const applicationRef = collection(db, "homes", homeID, "pointsApplication");
    const payload = {
      missionID: missionID,
      appliedBy: userID,
      appliedAt: new Date(),
      approvedBy: userStore.userData?.uid,
      approvedAt: new Date(),
      approved: true,
      redeemed: false,
    };
    await addDoc(applicationRef, payload);
    const mission = homeStore.missionMap[missionID];
    const family = homeStore.familyMap[userID];
    message.success(
      `${mission.points} points granted to ${family.name} for ${mission.name}`
    );
  } catch (error) {
    console.error(error);
    message.error("Failed to grant points.");
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
      <tr
        v-for="mission in homeStore.missions"
        :key="mission.id"
        class="even:bg-amber-200"
      >
        <td class="text-center p-2">{{ mission.name }}</td>
        <td class="text-center p-2">{{ mission.points }}</td>
        <td class="text-center p-2">
          <a-dropdown :trigger="['click']" class="cursor-pointer">
            <a class="ant-dropdown-link" @click.prevent>
              <span class="flex justify-center items-center"
                >Grant
                <DownOutlined class="text-base" />
              </span>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item
                  v-for="member in homeStore.filteredMembers"
                  :key="member.id"
                >
                  <button @click="() => handleGrant(mission.id, member.uid)">
                    {{ homeStore.familyMap[member.uid].name }}
                  </button>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="collapse w-[300px] md:w-[600px] mt-4 md:text-2xl">
    <input type="checkbox" />
    <p class="bg-blue text-white collapse-title text-center">
      Add Mission<MdOutlineAddCircleOutline
        class="inline-block h-4 md:h-6 w-4 md:w-6 align-middle mx-2"
      />
    </p>
    <form
      @submit="handleAddMission"
      class="collapse-content flex flex-col gap-4 my-4"
    >
      <div class="flex gap-4">
        <label class="w-1/5">Mission</label>
        <input
          type="text"
          v-model="newMission"
          class="flex-grow px-2 border border-blue rounded"
        />
      </div>
      <div class="flex gap-4">
        <label class="w-1/5">Points</label>
        <input
          type="number"
          v-model="newPoints"
          class="flex-grow px-2 border border-blue rounded"
        />
      </div>
      <button
        type="submit"
        class="cursor-pointer w-fit bg-blue text-white px-4 py-2 rounded-lg ml-auto"
      >
        Add
      </button>
    </form>
  </div>
</template>
