<script setup lang="ts">
import { computed } from "vue";
import { BsHouse } from "vue-icons-plus/bs";
import { useUserStore } from "../stores/user";
import { useHomeStore } from "../stores/home";
import { RiUser3Fill } from "vue-icons-plus/ri";

const userStore = useUserStore();
const userData = computed(() => userStore.userData);
const homeStore = useHomeStore();
</script>
<template>
  <table class="w-[300px] md:w-[600px] border-2 border-blue">
    <thead class="bg-blue text-white">
      <tr>
        <th class="p-2 flex justify-center items-center">
          <BsHouse />{{ userData?.homeID ? userData.homeID : "" }}
        </th>
        <th class="p-2">Name</th>
        <th class="p-2">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="userData" class="hover:bg-blue-100 transition">
        <td class="text-center p-2">
          <RiUser3Fill class="inline-block align-middle" />Me
        </td>
        <td v-if="userData.name" class="text-center p-2">
          {{ userData.name }}
        </td>
        <td v-else class="text-center p-2">N/A</td>
        <td v-if="userData.role" class="text-center p-2">
          {{ userData.role }}
        </td>
        <td v-else class="text-center p-2">N/A</td>
      </tr>
      <tr v-else class="hover:bg-blue-100 transition">
        <td>Me</td>
        <td>Loading...</td>
        <td>Loading...</td>
      </tr>
      <tr
        v-for="member in homeStore.filteredMembers"
        class="hover:bg-blue-100 transition"
      >
        <td class="text-center p-2">Other</td>
        <td class="text-center p-2">{{ member.name }}</td>
        <td class="text-center p-2">{{ member.role }}</td>
      </tr>
    </tbody>
  </table>
</template>
