<script setup lang="ts">
import { dashboardRoutes } from '../router/dashboard-routes';
</script>

<template>
  <div class="w-full flex flex-col">
    <div class="m-auto md:text-2xl">
      <span v-for="(route, index) in dashboardRoutes">
        <router-link :to="'/dashboard/' + route.path">
          <span class="px-2 hover:underline cursor-pointer">{{ `${route.name}` }}</span>
        </router-link>
        <span v-if="index !== dashboardRoutes.length -1">|</span>
      </span>
    </div>
    <div class="flex-grow">
      <router-view></router-view>
    </div>
  </div>
</template>
