<script lang="ts" setup>
import { BiEdit } from "vue-icons-plus/bi";
import { useUserStore } from "../stores/user";
import DashboardHomeTable from "../components/DashboardHomeTable.vue";
import ParentPointsSummary from "../components/ParentPointsSummary.vue";
import ChildPointsSummary from "../components/ChildPointsSummary.vue";

const userStore = useUserStore();
</script>

<template>
  <div class="flex flex-col items-center md:text-2xl gap-4">
    <div class="mt-4">
      <span v-if="!userStore.userData">Loading...</span>
      <span v-else>{{ userStore.userData?.email }}</span>
    </div>

    <div class="flex flex-col items-baseline">
      <h1 class="text-5xl md:text-7xl mt-4 font-goofy">
        My Home 
        <router-link :to="'/dashboard/profile'" class="inline-flex justify-baseline">
          <BiEdit class="inline"/>
        </router-link>
      </h1>

      <DashboardHomeTable />
    </div>

    <div class="flex flex-col items-baseline">
      <h1 class="text-5xl md:text-7xl mt-4 font-goofy">
        Summary
        <router-link :to="'/dashboard/points'" class="inline-flex justify-baseline">
          <BiEdit class="inline" />
        </router-link>
      </h1>

      <ParentPointsSummary v-if="userStore.userData?.role === 'parent' || userStore.userData?.role === 'other'" />
      <ChildPointsSummary v-else-if="userStore.userData?.role === 'child'" />
      <div v-else>
        <table class="w-[300px] md:w-[600px] border-2 border-blue">
          <thead class="bg-blue text-white">
            <tr>
              <th class="p-2 flex justify-center items-center">Person</th>
              <th class="p-2">Total Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2" class="text-center p-2">
                Your role is not recognized.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
