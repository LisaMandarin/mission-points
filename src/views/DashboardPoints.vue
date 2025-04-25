<script setup lang="ts">
import { computed } from "vue";
import ChildMissionTable from "../components/ChildMissionTable.vue";
import ParentMissionTable from "../components/ParentMissionTable.vue";
import ChildApplication from "../components/ChildApplication.vue";
import ParentApplication from "../components/ParentApplication.vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const userData = computed(() => userStore.userData);

</script>

<template>
  <div class="w-[300px] md:w-[600px] mx-auto">
    <h1 class="text-center text-4xl">Mission List</h1>
    <template v-if="userData?.role === 'child'">
      <ChildMissionTable />
    </template>
    <template
      v-else-if="userData?.role === 'parent' || userData?.role === 'other'"
    >
      <ParentMissionTable />
    </template>
    <template v-else>
      <p class="text-red-600 text-center p-2 md:text-2xl">
        You have to set up profile first
      </p>
    </template>
  </div>

  <div class="w-[300px] md:w-[600px] mx-auto mb-4">
    <h1 class="text-center text-4xl">Application History</h1>
    <template v-if="userData?.role === 'child'">
      <ChildApplication />
    </template>
    <template v-else-if="userData?.role === 'parent' || userData?.role === 'other'">
      <ParentApplication />
    </template>
    <template v-else>
      <p class="text-red-600 text-center p-2 md:text-2xl">
        You don't have any application yet
      </p>
    </template>
  </div>
</template>
