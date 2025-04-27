<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { RiCheckFill, RiDeleteBin5Line } from "vue-icons-plus/ri";
import { message } from "ant-design-vue";
import formatTime from "../utils/formatTime";
import ApplicationFilter from "./ApplicationFilter.vue";
import DirectionFilter from "./DirectionFilter.vue";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useUIStore } from "../stores/ui";
import { useUserStore } from "../stores/user";
import { useHomeStore } from "../stores/home";
import type { PointsApplicationType } from "../types";

// store
const ui = useUIStore();
const userStore = useUserStore();
const homeStore = useHomeStore();

// local state
const filteredApplications = ref<PointsApplicationType[]>([]);
const selectedFilter = ref("");
const selectedDirection = ref(true);

// handlers
const handleSelectedFilter = (field: string) => {
  selectedFilter.value = field;
  handleFilter();
};

const handleSelectedDirection = (isIncrement: boolean) => {
  selectedDirection.value = isIncrement;
  handleFilter();
};

const handleFilter = () => {
  const newApplications = [...homeStore.applications];
  if (selectedFilter.value === "") {
    filteredApplications.value = newApplications;
  } else if (selectedFilter.value === "time") {
    filteredApplications.value = newApplications.sort((a, b) => {
      const aTime = a.appliedAt?.toDate().getTime() ?? 0;
      const bTime = b.appliedAt?.toDate().getTime() ?? 0;
      return selectedDirection.value ? bTime - aTime : aTime - bTime;
    });
  } else if (selectedFilter.value === "name") {
    filteredApplications.value = newApplications.sort((a, b) => {
      const aName = a.appliedBy ?? "";
      const bName = b.appliedBy ?? "";
      return selectedDirection.value
        ? bName.localeCompare(aName)
        : aName.localeCompare(bName);
    });
  } else if (selectedFilter.value === "status") {
    filteredApplications.value = newApplications.sort((a, b) => {
      const aStatus = a.approved === true ? 1 : 0;
      const bStatus = b.approved === true ? 1 : 0;
      return selectedDirection.value ? bStatus - aStatus : aStatus - bStatus;
    });
  }
};

const deleteApplication = async (applicationID: string) => {
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
    console.error("Error deleting application: ", error);
    message.error("Failed to delete application");
  } finally {
    ui.isLoading = false;
  }
};

const grantApplication = async (applicationID: string) => {
  ui.isLoading = true;
  try {
    if (!applicationID) throw new Error("Invalid application ID");

    const homeID = homeStore.homeID;
    const applicationRef = doc(db, "homes", homeID, "pointsApplication", applicationID);
    const payload = {
      approved: true,
      approvedBy:  userStore.userData?.uid,
      approvedAt: new Date(),
    }
    await updateDoc(applicationRef, payload);
    message.success("application approved");
  } catch (error) {
    message.error("Failed to grant points.");
    console.error("Error granting points: ", error);
  } finally {
    ui.isLoading = false;
  }
}

watchEffect(() => {
  if (homeStore.applications.length > 0) {
    handleFilter();
  }
});
</script>

<template>
  <div class="space-x-2 my-2">
    <ApplicationFilter @update:filter="handleSelectedFilter" />
    <DirectionFilter @update:isIncrement="handleSelectedDirection" />
  </div>
  <table class="application w-full border-2 border-blue md:text-2xl">
    <thead class="bg-blue text-white">
      <tr class="align-top">
        <th class="px-2">Mission</th>
        <th class="px-2">Applied By</th>
        <th class="px-2">Status</th>
        <th class="px-2">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="application in filteredApplications"
        :key="application.id"
        class="even:bg-amber-200"
      >
        <td class="text-center">
          {{ homeStore.missionMap[application.missionID].name }}
        </td>
        <td class="text-center">
          <p class="font-semibold">
            {{
              application.appliedBy
                ? homeStore.familyMap[application.appliedBy].name
                : "N/A"
            }}
          </p>
          <p class="text-xs md:text-base">
            {{ application.appliedAt ? formatTime(application.appliedAt) : "" }}
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
        <td class="text-center space-x-4">
          <a-popconfirm
            title="Grant points to this application?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="grantApplication(application.id)"
          >
            <RiCheckFill
              :class="`inline-block ${
                application.approved
                  ? 'text-gray-300'
                  : 'cursor-pointer text-green-600 hover:text-green-400'
              }`"
            />
          </a-popconfirm>
          <a-popconfirm
            title="Are you sure to delete this application?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="deleteApplication(application.id)"
          >
            <RiDeleteBin5Line
              class="inline-block cursor-pointer text-red-600 hover:text-red-400"
            />
          </a-popconfirm>
        </td>
      </tr>
    </tbody>
  </table>
</template>
