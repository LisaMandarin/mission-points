<script setup lang="ts">
import { useHomeStore } from "../stores/home";
import formatTime from "../utils/formatTime";
import { RiCheckFill, RiDeleteBin5Line } from "vue-icons-plus/ri";

const homeStore = useHomeStore();
</script>

<template>
  <table class="w-full border-2 border-blue md:text-2xl">
    <thead class="bg-blue text-white">
      <tr class="align-top">
        <th class="px-2">Mission</th>
        <th class="px-2">Applied By</th>
        <th class="px-2">Status</th>
        <th class="px-2">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="application in homeStore.applications" :key="application.id" class="even:bg-amber-200">
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
            {{ formatTime(application.appliedAt) }}
          </p>
        </td>
        <td class="text-center">
          <span class="badge {{ application.approved ? badge-success : badge-warning }}">{{ application.approved ? "approved" : "pending" }}</span>
        </td>
        <td class="text-center space-x-4">
            <RiCheckFill class="inline-block cursor-pointer text-green-600 hover:text-green-400"/>
            <RiDeleteBin5Line class="inline-block cursor-pointer text-red-600 hover:text-red-400" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
