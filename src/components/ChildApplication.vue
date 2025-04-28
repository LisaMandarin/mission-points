<script setup lang="ts">
import { ref, computed } from "vue";
import { useHomeStore } from "../stores/home";
import formatTime from "../utils/formatTime";
import { IpReturn } from "vue-icons-plus/ip";
import ApplicationFilter from "./ApplicationFilter.vue";
import DirectionFilter from "./DirectionFilter.vue";
import { message } from "ant-design-vue";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useUIStore } from "../stores/ui";

const homeStore = useHomeStore();
const filteredApplications = computed(() => {
  const newApplications = [...homeStore.applicationsByUser];

  if (selectedFilter.value === "") {
    return newApplications;
  } else if (selectedFilter.value === "time") {
    return newApplications.sort((a, b) => {
      const aTime = a.appliedAt?.toDate().getTime() ?? 0;
      const bTime = b.appliedAt?.toDate().getTime() ?? 0;
      return selectedDirection.value ? aTime - bTime : bTime - aTime;
    });
  } else if (selectedFilter.value === "name") {
    return newApplications.sort((a, b) => {
      const aName = a.approvedBy ?? "";
      const bName = b.approvedBy ?? "";
      return selectedDirection.value
        ? bName.localeCompare(aName)
        : aName.localeCompare(bName);
    });
  } else if (selectedFilter.value === "status") {
    return newApplications.sort((a, b) => {
      const aStatus = a.approved === true ? 1 : 0;
      const bStatus = b.approved === true ? 1 : 0;
      return selectedDirection.value ? aStatus - bStatus : bStatus - aStatus;
    });
  } else {
    return newApplications;
  }
});
const selectedFilter = ref("");
const selectedDirection = ref(true);
const ui = useUIStore();

const undoMission = async (applicationID: string) => {
  ui.isLoading = true;
  try {
    if (!applicationID) {
      throw new Error("Invalid application ID");
    }
    const docRef = doc(
      db,
      "homes",
      homeStore.homeID,
      "pointsApplication",
      applicationID
    );
    await deleteDoc(docRef);
  } catch (error) {
    message.error("Failed to delete application");
    console.error("Error deleting application:", error);
  } finally {
    ui.isLoading = false;
  }
};

// watchEffect(() => {
//   if (homeStore.applicationsByUser.length > 0) {
//     filteredApplications.value = [...homeStore.applicationsByUser];
//   }
// });
</script>

<template>
  <div class="space-x-2 my-2">
    <ApplicationFilter v-model:modelValue="selectedFilter" />
    <DirectionFilter v-model:modelValue="selectedDirection" />
  </div>
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
      <tr
        v-if="filteredApplications"
        v-for="application in filteredApplications"
        :key="application.id"
        class="even:bg-amber-200"
      >
        <td class="text-center">
          <div>
            <p class="font-semibold">
              {{ homeStore.missionMap[application.missionID].name }}
            </p>
            <p class="text-xs md:text-base">
              {{
                application.appliedAt ? formatTime(application.appliedAt) : ""
              }}
            </p>
          </div>
        </td>
        <td class="text-center">
          <p>
            {{
              application.approvedBy
                ? homeStore.familyMap[application.approvedBy].name
                : "N/A"
            }}
          </p>
          <p class="text-xs md:text-base">
            {{
              application.approvedAt ? formatTime(application.approvedAt) : ""
            }}
          </p>
        </td>
        <td class="text-center">
          <span
            :class="`badge ${
              application.approved ? 'badge-success' : 'badge-warning'
            }`"
            >{{ application.approved ? "approved" : "pending" }}</span
          >
        </td>
        <td class="text-center">
          <a-popconfirm
            title="Are you sure to cancel the application?"
            ok-text="Yes"
            calcel-text="No"
            @confirm="undoMission(application.id)"
          >
            <button class="bg-orange text-white px-2 py-1 rounded-md text-base hover:text-blue cursor-pointer">
              <IpReturn class="inline-block" />
            </button>
          </a-popconfirm>
        </td>
      </tr>
      <tr v-else>
        <td colspan="4">No applications yet</td>
      </tr>
    </tbody>
  </table>
</template>
