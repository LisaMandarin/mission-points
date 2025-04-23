<script lang="ts" setup>
import { UserOutlined } from "@ant-design/icons-vue";
import { BiEdit } from "vue-icons-plus/bi";
import { useUserStore } from "../stores/user";
import DashboardTable from "../components/DashboardTable.vue";

const userStore = useUserStore();

</script>

<template>
  <div class="div-center md:text-2xl">
    <a-avatar :size="{ xs: 64, sm: 64, md: 120, lg: 120, xl: 200, xxl: 200 }">
      <template #icon><UserOutlined /></template>
    </a-avatar>

    <div>
      <span v-if="!userStore.userData">Loading...</span>
      <span v-else>{{ userStore.userData?.email }}</span>
    </div>

    <div class="flex items-baseline">
      <h1 class="text-5xl md:text-7xl mt-4">My Home</h1>
      <span class="px-2">
        <router-link :to="'/dashboard/profile'">
          <BiEdit />
        </router-link>
      </span>
    </div>
    <DashboardTable/>
  </div>
</template>
